"use client";

import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: name,
      });

      router.push("/feed");
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    }
  }

  return (
    <main className="app-page">
      <section className="form-card">
        <h1>Create account</h1>
        <p>Join the Sussex-Alive student community.</p>

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-button" type="submit">
            Sign Up
          </button>
        </form>

        <p className="form-link">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}





