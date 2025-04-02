"use client";

import { useEffect, useState } from "react";

// Define a TypeScript type (or interface) for your posts (adjust properties as needed)
type Post = {
  id: number; // adjust type if your id is a string
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function FeedPage() {
  // State to store posts, a loading state, and error messages
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from your backend when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://sussex-alive-backend.onrender.com/api/posts");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Render a loading indicator, error message, or the list of posts
  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading posts...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem", color: "red" }}>Error loading posts: {error}</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


  