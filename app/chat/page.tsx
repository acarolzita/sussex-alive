"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Define a type for a user.
interface User {
  id: string;
  name?: string;
}

// Connect to your backend Socket.io server.
const socket = io("http://localhost:5001");

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("User1");
  const [receiver, setReceiver] = useState("User2");
  // selectedUser is explicitly typed as User or null.
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // When selectedUser is defined, fetch messages for that user.
  useEffect(() => {
    if (selectedUser) {
      // TypeScript now knows selectedUser is not null.
      const userId: string = selectedUser.id;
      fetch(`/api/messages?receiverId=${userId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [selectedUser]);

  // Handler for updating selectedUser
  const handleSelectedUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setSelectedUser(null);
    } else {
      // Create a proper User object.
      setSelectedUser({ id: value });
    }
  };

  const sendMessage = () => {
    if (!text.trim() || !selectedUser) return;
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
          Selected User ID:
          <input
            type="text"
            value={selectedUser ? selectedUser.id : ""}
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





