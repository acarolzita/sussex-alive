import React from "react";

type Post = {
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
};

export default function PostCard({ post }: { post: Post }) {
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold text-blue-600 mb-2">{post.title}</h2>
      <p className="text-gray-800 mb-2">{post.content}</p>
      <p className="text-sm text-gray-500 italic">
        By {post.author || "Unknown"} on {date}
      </p>
    </div>
  );
}


  