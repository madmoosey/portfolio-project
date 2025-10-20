import React from "react";

export default function LoginPrompt() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-2">You’re not logged in</h2>
      <p className="text-gray-400 mb-6">
        Please log in to view your media gallery.
      </p>
      <a
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
      >
        Log In
      </a>
    </div>
  );
}