"use client";

import { useEffect, useState } from "react";
import styles from "./Feed.module.css";

// Define a TypeScript type for your posts
type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading posts: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p>{post.content}</p>
              <p className={styles.postMeta}>
                By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



  