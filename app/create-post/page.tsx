"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Retrieve the JWT token stored in localStorage during login
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to be logged in to create a post.");
      return;
    }

    try {
      // Make a POST request to your backend, including the JWT in the Authorization header.
      const res = await fetch("https://sussex-alive-backend.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Post created successfully!");
        // Optionally, redirect to the feed page after a successful post creation.
        router.push("/feed");
      } else {
        setMessage(data.error || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("An error occurred while creating the post.");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create a New Post</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleCreatePost}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Content:{" "}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </label>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}


