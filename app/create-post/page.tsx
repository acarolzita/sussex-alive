"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("You must be logged in to create a post.");
      return;
    }

    try {
      const idToken = await user.getIdToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://sussex-alive-backend.onrender.com"}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to create post.");
      }

      setMessage("✅ Post created successfully!");
      router.push("/feed");
    } catch (error: any) {
      console.error("Create post error:", error);
      setMessage("❌ Error creating post: " + error.message);
    }
  }

  return (
    <ProtectedRoute>
      <div className="main-container">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleCreatePost} className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}








