import React from "react";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

ReactModal.setAppElement("#root");

export default function Lightbox({ isOpen, onClose, item }) {
  if (!item) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center h-full outline-none"
      overlayClassName="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <motion.div
        className="relative max-w-6xl w-full px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {item.type === "image" ? (
          <img
            src={item.src}
            alt="fullscreen"
            className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
          />
        ) : (
          <ReactPlayer
            url={item.src}
            controls
            width="100%"
            height="80vh"
            className="rounded-xl overflow-hidden"
          />
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
        >
          ✕
        </button>
        {item.caption && (
          <p className="text-center mt-4 text-gray-300">{item.caption}</p>
        )}
      </motion.div>
    </ReactModal>
  );
}