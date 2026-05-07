"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  return (
    <nav className="site-navbar">
      <div className="site-navbar-inner">
        <Link href="/" className="site-brand">
          <div className="site-brand-icon">SAL</div>
          <span>Sussex-Alive</span>
        </Link>

        {user && (
          <div className="site-nav-links">
            <Link href="/feed">Feed</Link>
            <Link href="/create-post">Create Post</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/profile">Profile</Link>
          </div>
        )}

        <div className="site-auth-buttons">
          {!user ? (
            <>
              <Link href="/login" className="nav-login-btn">
                Login
              </Link>

              <Link href="/register" className="nav-signup-btn">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="site-user-email">{user.email}</span>
              <button onClick={handleLogout} className="nav-logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

