"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) return;

    alert("Message sent! We can connect this to real-time chat next.");
    setMessage("");
  }

  return (
    <main className="app-page">
      <div className="app-container">
        <header className="app-header">
          <h1>Student Chat</h1>
          <p>Message other Sussex students and keep conversations going.</p>
        </header>

        <section className="chat-box">
          <div className="chat-message">
            <strong>Anna:</strong>
            <p>Hey! Is anyone going to the library later?</p>
          </div>

          <div className="chat-message me">
            <strong>You:</strong>
            <p>I might go after my lecture.</p>
          </div>

          <div className="chat-message">
            <strong>James:</strong>
            <p>Same here. We could do a study session.</p>
          </div>

          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="primary-button" type="submit">
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}








