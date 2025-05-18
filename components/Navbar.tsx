"use client";

import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  return (
    <nav className="w-full flex justify-between items-center px-6 py-3 bg-white shadow-md">
      <div className="flex items-center gap-6">
        <a href="/" className="text-xl font-bold text-blue-600 hover:underline">
          Sussex-Alive
        </a>
        {user && (
          <>
            <a href="/feed" className="text-gray-700 hover:text-blue-500">
              Feed
            </a>
            <a href="/create-post" className="text-gray-700 hover:text-blue-500">
              Create Post
            </a>
            <a href="/chat" className="text-gray-700 hover:text-blue-500">
              Chat
            </a>
            <a href="/profile" className="text-gray-700 hover:text-blue-500">
              Profile
            </a>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <a href="/login" className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Login
            </a>
            <a href="/register" className="text-sm px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
              Sign Up
            </a>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

