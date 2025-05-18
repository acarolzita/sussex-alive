"use client";

import { useState, useEffect } from "react";
import PostCard from "../../components/PostCard";

// Define the type for Post objects
type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
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

  if (loading) {
    return <div className="p-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading posts: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}









  