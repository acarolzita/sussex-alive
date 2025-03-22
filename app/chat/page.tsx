"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to your backend Socket.io server
const socket = io("http://localhost:5001");

// Define a type for User
interface User {
  id: string;
  name?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("User1");
  const [receiver, setReceiver] = useState("User2");
  // Initialize selectedUser as null or a User object
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/messages?receiverId=${selectedUser.id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (!text.trim()) return;
    const msg = { sender, text, receiver };
    socket.emit("message", msg);
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat Page</h1>

      <div style={{ marginBottom: 10 }}>
        <label>
          Sender:
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Receiver:
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Selected User ID:
          <input
            type="text"
            value={selectedUser ? selectedUser.id : ""}
            onChange={(e) => {
              // When typing, update selectedUser with a simple object.
              setSelectedUser({ id: e.target.value });
            }}
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




