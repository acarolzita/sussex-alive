"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Define a type for a user
interface User {
  id: string;
  name?: string;
}

// Connect to your backend Socket.io server
const socket = io("http://localhost:5001");

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("User1");
  const [receiver, setReceiver] = useState("User2");
  // selectedUser can be a User object or null
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // When selectedUser is set, fetch messages for that user
  useEffect(() => {
    if (selectedUser) {
      fetch(`/api/messages?receiverId=${selectedUser.id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [selectedUser]);

  const sendMessage = () => {
    // Do nothing if no text or no selectedUser
    if (!text.trim() || !selectedUser) return;
    const msg = { sender, text, receiver };
    socket.emit("message", msg);
    // Update local messages so sender sees the message immediately
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
            value={selectedUser ? selectedUser.id : ""}
            onChange={(e) => setSelectedUser({ id: e.target.value })}
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





