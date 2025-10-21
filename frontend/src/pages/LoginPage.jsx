import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { login } from "../auth"; // <-- from your auth.js

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com"); // using email for JWT auth
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1200); // short delay before redirect
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
        <h1 className="text-center text-4xl mb-6">enter The Department</h1>

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
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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