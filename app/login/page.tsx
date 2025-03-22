"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handlePost = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, image }),
    });

    setContent("");
    setImage("");
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold text-blue-600">Sussex-Alive</h2>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white shadow-lg rounded-lg p-4 mt-4 w-96"
      >
        <textarea 
          className="w-full border p-2 rounded-lg" 
          placeholder="What's on your mind?"
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />
        <input 
          className="w-full border p-2 mt-2 rounded-lg" 
          placeholder="Image URL" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
        />
        <button 
          onClick={handlePost} 
          className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Post
        </button>
      </motion.div>

      {posts.map((post) => (
        <motion.div 
          key={post.id} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white shadow-md rounded-lg p-4 mt-4 w-96"
        >
          <p className="text-gray-800">{post.content}</p>
          {post.image && <img src={post.image} className="mt-2 w-full rounded-lg" />}
          <div className="flex justify-between mt-2">
            <button className="text-blue-500 hover:text-blue-700">Like</button>
            <button className="text-gray-500 hover:text-gray-700">Comment</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

