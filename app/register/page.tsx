"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Custom email validation for Sussex domain
    if (!email.endsWith("@sussex.ac.uk")) {
      setError("Only @sussex.ac.uk email addresses are allowed.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/feed");
    } catch (err: any) {
      const code = err.code;
      let message = "Registration failed.";

      if (code === "auth/email-already-in-use") message = "Email already in use.";
      else if (code === "auth/invalid-email") message = "Invalid email address.";
      else if (code === "auth/weak-password") message = "Password should be at least 6 characters.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main-container">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in here
        </a>
      </p>
    </div>
  );
}





