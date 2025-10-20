import React from "react";
import { motion } from "framer-motion";

export default function Title({ text }) {
  return (
    <motion.h1
      className="text-center text-3xl font-bold mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
    </motion.h1>
  );
}