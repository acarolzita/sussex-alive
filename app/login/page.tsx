"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define an interface for a post.
interface Post {
  id: string;
  content: string;
  // Add other properties if needed, e.g. sender, receiver, etc.
}

export default function LoginPage() {
  // Explicitly type posts as an array of Post objects.
  const [posts, setPosts] = useState<Post[]>([]);

  // Example: fetch posts when the component mounts.
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Login Page</h1>
      {/* Render posts if available */}
      {posts.map((post) => (
        <motion.div
          key={post.id}  // Now TypeScript knows that post has an "id" property.
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-lg p-4 mt-4 w-96"
        >
          <p>{post.content}</p>
        </motion.div>
      ))}
    </div>
  );
}

