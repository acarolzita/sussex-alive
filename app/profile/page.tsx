"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setBio(data.bio || "");
        setProfilePic(data.profilePic || "");
      });
  }, []);

  const handleUpdate = async () => {
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, profilePic }),
    });
    alert("Profile updated!");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col items-center mt-10"
    >
      <h2 className="text-3xl font-bold text-blue-600">Your Profile</h2>
      <img src={profilePic || "/default-avatar.png"} className="w-24 h-24 rounded-full mt-4 shadow-lg" />
      <input 
        className="border p-2 mt-2 rounded-lg w-72 text-center" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <textarea 
        className="border p-2 mt-2 rounded-lg w-72 text-center" 
        value={bio} 
        onChange={(e) => setBio(e.target.value)} 
      />
      <button 
        onClick={handleUpdate} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Update Profile
      </button>
    </motion.div>
  );
}
