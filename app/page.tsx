// app/page.tsx
"use client";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="main-container text-center">
      <header className="mb-6">
        <Image
          src="/sussex-logo.png"
          alt="Sussex-Alive Logo"
          width={120}
          height={120}
          priority
        />
      </header>

      <main>
        <h1 className="text-4xl font-bold mb-4">Welcome to Sussex-Alive 🎓</h1>
        <p className="text-lg text-gray-600 mb-6">
          A social platform for Sussex students to connect, post, and thrive together.
        </p>

        <div className="flex justify-center gap-4">
          <a href="/register" className="btn btn-primary">
            Join Now
          </a>
          <a href="/login" className="btn btn-secondary">
            Log In
          </a>
        </div>
      </main>
    </div>
  );
}



