"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Explicitly type the socket variable
let socket: Socket | undefined;

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("User1");
  const [receiver, setReceiver] = useState("User2");
  const [selectedUser, setSelectedUser] = useState<{ id: string }>({ id: "" });

  useEffect(() => {
    socket = io("https://sussex-alive-backend.onrender.com");
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedUser.id !== "") {
      fetch(`/api/messages?receiverId=${selectedUser.id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [selectedUser]);

  const handleSelectedUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser({ id: e.target.value });
  };

  const sendMessage = () => {
    if (!text.trim() || selectedUser.id === "") return;
    const msg = { sender, text, receiver };
    socket?.emit("message", msg);
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat Page</h1>
      <div style={{ marginBottom: 10 }}>
        <label>
          Selected User ID:
          <input
            type="text"
            value={selectedUser.id}
            onChange={handleSelectedUserChange}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Message:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>
      <button onClick={sendMessage}>Send</button>
      <hr />
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.sender}</strong>: {msg.text} (to {msg.receiver})
          </li>
        ))}
      </ul>
    </div>
  );
}




