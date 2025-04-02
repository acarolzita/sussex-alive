"use client";

import { useState, useEffect } from "react";

// Define a TypeScript type for your posts
type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function FeedPage() {
  // Create state variables
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Send a GET request to your backend endpoint
        const res = await fetch("https://sussex-alive-backend.onrender.com/api/posts");
        
        // Check if the response status is OK
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        
        // Parse the response as JSON and update state
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        // In case of error, update error state
        setError(err.message);
      } finally {
        // Stop the loading spinner
        setLoading(false);
      }
    }
    // Call the fetchPosts function
    fetchPosts();
  }, []);

  // Conditionally render based on state
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




  