import React from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function MediaItem({ item, index, onClick }) {
  return (
    <div
      key={index}
      className="relative cursor-pointer"
      onClick={() => onClick(item)}
    >
      <motion.h3
        className="text-center text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {item.caption}
      </motion.h3>
      {item.type === "image" ? (
        <motion.img
          src={item.src}
          alt={`slide-${index}`}
          className="w-full h-[70vh] object-cover rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <div className="flex justify-center">
          <ReactPlayer
            url={item.src}
            controls
            width="100%"
            height="70vh"
            className="rounded-2xl overflow-hidden"
          />
        </div>
      )}
      {item.caption && (
        <p className="absolute bottom-3 left-4 text-sm text-gray-200 bg-black/50 px-3 py-1 rounded">
          {item.caption}
        </p>
      )}
    </div>
  );
}