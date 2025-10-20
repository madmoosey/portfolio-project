import React from "react";
import Slider from "react-slick";
import MediaItem from "./MediaItem";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ media }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <motion.div
      className="w-full max-w-5xl p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Slider {...settings}>
        {media.map((item, index) => (
          <MediaItem key={index} item={item} index={index} />
        ))}
      </Slider>
    </motion.div>
  );
}