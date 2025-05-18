"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

interface Message {
  sender: string;
  text: string;
  receiver: string;
}

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || "https://sussex-alive-backend.onrender.com");

      socketRef.current.on("message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages?receiverId=${selectedUserId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUserId]);

  const sendMessage = async () => {
    if (!text.trim() || !selectedUserId) return;

    const idToken = await user?.getIdToken(); // Optional for auth
    const msg: Message = {
      sender: user?.uid || "Anonymous",
      text,
      receiver: selectedUserId,
    };

    socketRef.current?.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div className="main-container p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="mb-4">
        <label className="mr-2">Receiver ID:</label>
        <input
          type="text"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="input"
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">Message:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input"
        />
      </div>

      <button onClick={sendMessage} className="btn btn-primary mb-4">
        Send
      </button>

      <hr />
      <h2 className="text-xl font-semibold mt-4 mb-2">Messages</h2>
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.sender}</strong>: {msg.text} <em>(to {msg.receiver})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}








