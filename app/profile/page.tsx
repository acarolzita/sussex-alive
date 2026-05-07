"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="app-page">
      <div className="app-container">
        <header className="app-header">
          <h1>Your Profile</h1>
          <p>Manage your Sussex-Alive student identity.</p>
        </header>

        <section className="app-card">
          <div className="feed-post-top">
            <div className="avatar blue">
              {user?.email?.charAt(0).toUpperCase() || "S"}
            </div>
            <div>
              <h3>{user?.displayName || "Sussex Student"}</h3>
              <p>{user?.email || "Not signed in"}</p>
            </div>
          </div>

          <p>
            This profile page is ready for upgrades such as course, bio,
            interests, societies, posts, and profile pictures.
          </p>

          <Link href="/feed" className="primary-button">
            Back to Feed
          </Link>
        </section>
      </div>
    </main>
  );
}


