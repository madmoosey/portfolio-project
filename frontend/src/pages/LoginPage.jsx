import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // for Django session cookies
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Invalid credentials");
      }

      setSuccess(true);
      window.location.href = "/"; // redirect to home after login
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader message="Signing you in..." />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <motion.div
        className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-center text-4xl mb-6">
          enter The Department
        </h1>
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 text-green-300 p-3 rounded mb-4 text-sm">
            returning to glory...
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          are you uninitiated? sigh,{" "}
          <a href="/signup" className="text-blue-400 hover:text-blue-300">
            request access
          </a>
        </p>
      </motion.div>
    </div>
  );
}