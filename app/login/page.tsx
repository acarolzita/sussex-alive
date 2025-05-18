// app/login/page.tsx
"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/feed"); // Redirect to feed after successful login
    } catch (err: any) {
      const code = err.code || "";
      let message = "Login failed.";

      if (code === "auth/user-not-found") message = "User not found.";
      else if (code === "auth/wrong-password") message = "Incorrect password.";
      else if (code === "auth/invalid-email") message = "Invalid email format.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-container flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          aria-busy={loading}
          className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}









