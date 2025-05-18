"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

interface Message {
  sender: string;
  text: string;
  receiver: string;
  createdAt?: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");
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
    const fetchMessages = async () => {
      if (!receiverId || !user?.uid) return;

      try {
        const idToken = await user.getIdToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages?senderId=${user.uid}&receiverId=${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages", await res.text());
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [receiverId, user]);

  const sendMessage = async () => {
    if (!text.trim() || !receiverId || !user?.uid) return;

    const idToken = await user.getIdToken();

    const msg: Message = {
      sender: user.uid,
      receiver: receiverId,
      text,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(msg),
      });

      if (res.ok) {
        const savedMsg = await res.json();
        socketRef.current?.emit("sendMessage", savedMsg);
        setMessages((prev) => [...prev, savedMsg]);
        setText("");
      } else {
        console.error("Failed to send message", await res.text());
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="main-container p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="mb-4">
        <label className="mr-2">Receiver UID:</label>
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="input"
          placeholder="Enter another user's UID"
        />
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input flex-grow"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold mb-2">Messages</h2>
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="border p-2 rounded">
            <strong>{msg.sender}</strong>: {msg.text}{" "}
            <em className="text-sm text-gray-500">(to {msg.receiver})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}









