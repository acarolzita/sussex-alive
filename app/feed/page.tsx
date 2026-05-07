"use client";

import Link from "next/link";

export default function FeedPage() {
  return (
    <main className="app-page">
      <div className="app-container">
        <header className="app-header">
          <h1>Campus Feed</h1>
          <p>See what Sussex students are sharing today.</p>
          <Link href="/create-post" className="primary-button">
            Create Post
          </Link>
        </header>

        <article className="feed-post">
          <div className="feed-post-top">
            <div className="avatar blue">AM</div>
            <div>
              <h3>Anna M.</h3>
              <p>Computer Science · 5 mins ago</p>
            </div>
          </div>
          <p>
            Working on my web development project today. Anyone else building
            something for their portfolio?
          </p>
          <div className="preview-actions">
            <span>❤️ 21 likes</span>
            <span>💬 8 comments</span>
          </div>
        </article>

        <article className="feed-post">
          <div className="feed-post-top">
            <div className="avatar yellow">JS</div>
            <div>
              <h3>James S.</h3>
              <p>Business & Management · 18 mins ago</p>
            </div>
          </div>
          <p>
            Society meetup happening this Friday near Falmer House. Great chance
            to meet people before exams.
          </p>
          <div className="preview-actions">
            <span>❤️ 34 likes</span>
            <span>💬 12 comments</span>
          </div>
        </article>

        <article className="feed-post">
          <div className="feed-post-top">
            <div className="avatar purple">LK</div>
            <div>
              <h3>Leah K.</h3>
              <p>Media Studies · 31 mins ago</p>
            </div>
          </div>
          <p>
            Looking for people interested in creating short videos about campus
            life at Sussex.
          </p>
          <div className="preview-actions">
            <span>❤️ 16 likes</span>
            <span>💬 5 comments</span>
          </div>
        </article>
      </div>
    </main>
  );
}









  