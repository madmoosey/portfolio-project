import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

export default function MediaItem({ item, index, onMediaEnd }) {
  const timerRef = useRef(null);

  useEffect(() => {
    // If this is an image, set a 4-second timer to advance
    if (item.type === "image") {
      timerRef.current = setTimeout(() => {
        if (onMediaEnd) onMediaEnd();
      }, 4000);
    }

    // Cleanup timer when unmounted or when item changes
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [item, onMediaEnd]);

  return (
    <div key={index} className="relative">
      {/* Title above media */}
      {item.caption && (
        <motion.h3
          className="text-center text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {item.caption}
        </motion.h3>
      )}

      {/* Media */}
      {item.type === "video" ? (
        <VideoPlayer
          src={item.file}
          onEnded={onMediaEnd} // advance carousel when video ends
        />
      ) : (
        <motion.img
          src={item.file}
          alt={`media-${index}`}
          className="w-full h-[70vh] object-contain rounded-2xl shadow-lg bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
      )}

      {/* Caption overlay */}
      {item.caption && (
        <p className="absolute bottom-10 left-4 text-sm text-gray-200 bg-black/50 px-3 py-1 rounded">
          {item.caption}
        </p>
      )}
    </div>
  );
}