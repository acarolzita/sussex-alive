"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please write something before posting.");
      return;
    }

    alert("Post created! We will connect this properly next.");
    setContent("");
  }

  return (
    <main className="create-post-page">
      <section className="create-post-card">
        <h1>Create a Post</h1>
        <p>Share an update with the Sussex-Alive community.</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening on campus?"
            rows={6}
          />

          <button type="submit">Post Update</button>
        </form>
      </section>
    </main>
  );
}








