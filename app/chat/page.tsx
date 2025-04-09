"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  text: string;
  receiver: string;
}

let socket: Socket | undefined;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("User1"); // For MVP; later derive from auth data
  const [receiver, setReceiver] = useState("User2");
  const [selectedUser, setSelectedUser] = useState<{ id: string }>({ id: "" });

  useEffect(() => {
    // Connect to the backend Socket.io server
    socket = io("https://sussex-alive-backend.onrender.com");

    // Listen for broadcasted messages using "message" event if that's how the server sends it,
    // or change to "sendMessage" if the server broadcast uses that.
    socket.on("message", (msg: Message) => {
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
        .then((data) => setMessages(data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedUser]);

  const handleSelectedUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser({ id: e.target.value });
  };

  const sendMessage = () => {
    if (!text.trim() || selectedUser.id === "") return;
    const msg: Message = { sender, text, receiver };
    
    // Emit with event name "sendMessage" to match backend, if needed:
    socket?.emit("sendMessage", msg);
    
    // Alternatively, if backend emits back via "message", you may omit local addition
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






