// components/PostCard.tsx

import React from "react";

type Post = {
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

  