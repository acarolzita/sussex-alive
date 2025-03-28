"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState("User1");
  const [receiver, setReceiver] = useState("User2");
  const [selectedUser, setSelectedUser] = useState<User>({ id: "" });

  useEffect(() => {
    // Connect once on mount
    socket = io("http://localhost:5001");
    // Optionally listen for messages from the server
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const { id } = selectedUser;
    if (id !== "") {
      fetch(`/api/messages?receiverId=${id}`)
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



