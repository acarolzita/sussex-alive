"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;

        const idToken = await user.getIdToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setName(data.name || "");
        setBio(data.bio || "");
        setProfilePic(data.profilePic || "");
      } catch (error) {
        console.error("Error loading profile:", error);
        setMessage("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setMessage("");

      const idToken = await user?.getIdToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${user?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ name, bio, profilePic }),
        }
      );

      if (!res.ok) throw new Error("Update failed");
      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4 text-red-500">Not logged in</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center mt-10"
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Your Profile</h2>
      <img
        src={profilePic || "/default-avatar.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full shadow-lg mb-4"
      />

      <input
        className="border p-2 mb-2 rounded-lg w-72 text-center"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />
      <textarea
        className="border p-2 mb-2 rounded-lg w-72 text-center"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Your Bio"
      />
      <input
        className="border p-2 mb-4 rounded-lg w-72 text-center"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
        placeholder="Profile Picture URL"
      />

      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

      {message && (
        <p className={`mt-4 text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </motion.div>
  );
}


