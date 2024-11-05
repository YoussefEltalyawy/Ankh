// ImageSlideshow.tsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "/showcase3.png", alt: "Image 1" },
    { src: "/showcase4.png", alt: "Image 2" },
    { src: "/showcase6.png", alt: "Image 2" },
    {src: "/showcase7.png", alt: "Image4" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[2/1] flex items-center justify-center">
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image
            src={img.src}
            alt={`${img.alt} ${index + 1}`}
            className="mx-auto"
            width={1110}
            height={588}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlideshow;
