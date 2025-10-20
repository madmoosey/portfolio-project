import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 mt-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500 mb-3"></div>
      <p>{message}</p>
    </div>
  );
}