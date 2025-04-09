"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "../api/posts"; // Adjust the import path as needed

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to be logged in to create a post.");
      return;
    }

    try {
      const newPost = await createPost(title, content, token);
      setMessage("Post created successfully!");
      router.push("/feed");
    } catch (error) {
      setMessage("Error creating post: " + error.message);
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

  