import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function MediaItem({ item, index, onClick }) {
  const imgRef = useRef(null);

  const handleImageClick = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const toleranceX = rect.width * 0.2;
    const toleranceY = rect.height * 0.2;

    const isCenterClick =
      Math.abs(clickX - centerX) < toleranceX &&
      Math.abs(clickY - centerY) < toleranceY;

    if (isCenterClick) {
      if (!document.fullscreenElement) {
        if (img.requestFullscreen) img.requestFullscreen();
        else if (img.webkitRequestFullscreen) img.webkitRequestFullscreen();
        else if (img.msRequestFullscreen) img.msRequestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div key={index} className="relative">
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
          ref={imgRef}
          src={item.file}
          alt={`slide-${index}`}
          className="w-full h-[70vh] object-contain rounded-2xl shadow-lg cursor-pointer bg-black"
          onClick={handleImageClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <div className="flex justify-center">
          <ReactPlayer
            url={item.file}
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