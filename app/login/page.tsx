"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/feed");
    } catch (error) {
      alert("Login failed. Please check your email and password.");
      console.error(error);
    }
  }

  return (
    <main className="app-page">
      <section className="form-card">
        <h1>Log in</h1>
        <p>Welcome back to Sussex-Alive.</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@sussex.ac.uk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-button" type="submit">
            Log In
          </button>
        </form>

        <p className="form-link">
          New here? <Link href="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}









