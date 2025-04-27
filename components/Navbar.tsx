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
    <nav className="navbar">
      <div className="flex items-center gap-4">
        <a href="/" className="nav-link font-bold text-lg">
          Sussex-Alive
        </a>
        {user && (
          <>
            <a href="/feed" className="nav-link">
              Feed
            </a>
            <a href="/create-post" className="nav-link">
              Create Post
            </a>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!user && (
          <>
            <a href="/login" className="nav-link">
              Login
            </a>
            <a href="/signup" className="nav-link">
              Sign Up
            </a>
          </>
        )}
        {user && (
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
