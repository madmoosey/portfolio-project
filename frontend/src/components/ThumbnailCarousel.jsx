import React from "react";
import Slider from "react-slick";

export default function ThumbnailCarousel({ media, asNavFor, onThumbnailClick }) {
  const settings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    infinite: true,
  };

  return (
    <div className="mt-4">
      <Slider {...settings} asNavFor={asNavFor}>
        {media.map((item, i) => (
          <div
            key={i}
            className="px-2"
            onClick={() => onThumbnailClick(i)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`thumb-${i}`}
                className="h-24 w-full object-cover rounded-xl opacity-80 hover:opacity-100 cursor-pointer"
              />
            ) : (
              <div className="relative h-24 bg-black rounded-xl flex items-center justify-center cursor-pointer">
                🎥
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}