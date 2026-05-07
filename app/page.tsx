"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/feed");
    }
  }, [user, router]);

  return (
    <main className="home-page">
      <section className="home-section">
        <div className="home-left">
          <div className="home-logo">SA</div>

          <p className="home-badge">Built for University of Sussex students</p>

          <h1 className="home-title">
            Your campus community, <span>online.</span>
          </h1>

          <p className="home-subtitle">
            Sussex-Alive is a student-only social platform where Sussex students
            can share posts, find classmates, join conversations, and stay
            connected with campus life.
          </p>

          <div className="home-buttons">
            <Link href="/register" className="home-btn home-btn-primary">
              Join Sussex-Alive
            </Link>

            <Link href="/login" className="home-btn home-btn-secondary">
              Log In
            </Link>
          </div>

          <div className="home-features">
            <div className="home-feature-card">
              <h3>Posts</h3>
              <p>Share updates</p>
            </div>

            <div className="home-feature-card">
              <h3>Chat</h3>
              <p>Message students</p>
            </div>

            <div className="home-feature-card">
              <h3>Profiles</h3>
              <p>Meet classmates</p>
            </div>
          </div>
        </div>

        <div className="feed-preview">
          <div className="feed-preview-header">
            <div>
              <h2>Campus Feed Preview</h2>
              <p>See what students are sharing</p>
            </div>
            <span>Live</span>
          </div>

          <div className="preview-posts">
            <article className="preview-post">
              <div className="preview-user">
                <div className="avatar blue">AM</div>
                <div>
                  <h3>Anna M.</h3>
                  <p>Computer Science · 2 mins ago</p>
                </div>
              </div>
              <p>
                Anyone going to the library study session tonight? Looking for
                people revising databases and web development.
              </p>
              <div className="preview-actions">
                <span>❤️ 18 likes</span>
                <span>💬 6 comments</span>
              </div>
            </article>

            <article className="preview-post">
              <div className="preview-user">
                <div className="avatar yellow">JS</div>
                <div>
                  <h3>James S.</h3>
                  <p>Business & Management · 14 mins ago</p>
                </div>
              </div>
              <p>
                New society meetup this Friday near Falmer House. Great chance
                to meet new people before exams.
              </p>
              <div className="preview-actions">
                <span>❤️ 31 likes</span>
                <span>💬 12 comments</span>
              </div>
            </article>

            <article className="preview-post">
              <div className="preview-user">
                <div className="avatar purple">LK</div>
                <div>
                  <h3>Leah K.</h3>
                  <p>Media Studies · 25 mins ago</p>
                </div>
              </div>
              <p>
                Looking for creators to collaborate on a short campus-life video
                project.
              </p>
              <div className="preview-actions">
                <span>❤️ 24 likes</span>
                <span>💬 9 comments</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}



