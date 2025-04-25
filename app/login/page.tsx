"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Login successful, token received:", data.token);
        localStorage.setItem("token", data.token);
        router.push("/feed");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email:{" "}
            <input
              type="email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.5rem 1rem" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}




