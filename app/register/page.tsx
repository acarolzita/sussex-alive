"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "https://sussex-alive-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, password, studentId }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("Registration successful:", data);
        router.push("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Network or parsing error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email:{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Student ID:{" "}
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              disabled={loading}
            />
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ padding: "0.5rem 1rem" }}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}



