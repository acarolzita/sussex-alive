"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    if (selectedUser) {
      fetch(`/api/messages?receiverId=${selectedUser.id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));

      socket.on(`chat:${selectedUser.id}`, (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off(`chat:${selectedUser.id}`);
      };
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, receiverId: selectedUser.id }),
    });

    socket.emit("message", { senderId: "User123", receiverId: selectedUser.id, text });
    setText("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 border-r bg-gray-100">
        <h2 className="text-lg font-bold">Users</h2>
        {users.map((user) => (
          <motion.div 
            key={user.id} 
            onClick={() => setSelectedUser(user)} 
            className="cursor-pointer p-2 hover:bg-blue-200 rounded-lg transition"
          >
            {user.name}
          </motion.div>
        ))}
      </div>
      <div className="w-2/3 p-4">
        {selectedUser ? (
          <>
            <h2 className="text-lg font-bold">Chat with {selectedUser.name}</h2>
            <div className="border p-4 h-64 overflow-auto bg-gray-50 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 rounded-md ${msg.senderId === "User123" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <input className="border p-2 mt-2 w-full" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={sendMessage} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </>
        ) : <p>Select a user to chat with</p>}
      </div>
    </div>
  );
}


