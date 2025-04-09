"use client";

import { useState, useEffect } from "react";
import PostCard from "../../components/PostCard"; // Ensure that your PostCard component is in /components/PostCard.tsx

// Define the type for Post objects
type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function FeedPage() {
  // State variables to keep track of posts, loading state, and error messages
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch posts from the backend when the component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch posts from your backend API
        const res = await fetch("https://sussex-alive-backend.onrender.com/api/posts");
        if (!res.ok) {
          // If the response is not OK, throw an error with the status code
          throw new Error(`Error: ${res.status}`);
        }
        // Parse the JSON response into a Post array
        const data: Post[] = await res.json();
        // Update the posts state with the retrieved posts
        setPosts(data);
      } catch (err: any) {
        // If an error occurs, update the error state
        setError(err.message);
      } finally {
        // Regardless of success or failure, set loading to false
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Display a loading message while posts are being fetched
  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading posts...</div>;
  }

  // Display an error message if something went wrong during fetching
  if (error) {
    return <div style={{ padding: "2rem", color: "red" }}>Error loading posts: {error}</div>;
  }

  // Render the feed: if no posts exist, display a placeholder message; otherwise, map over the posts array and render a PostCard for each post
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Feed</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}








  