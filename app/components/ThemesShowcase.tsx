"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Image {
  src: string;
  alt: string;
  buttonBg: string;
  buttonTextColor: string;
}

const ThemeShowcase = () => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const images: Image[] = [
    {
      src: "/cairo-theme-showcase.png",
      alt: "Cairo's Late Drive",
      buttonBg: "/cairoLateDrive-d.jpg",
      buttonTextColor: "#ffd24b",
    },
    {
      src: "/northc-theme-showcase.png",
      alt: "North Coast's Shore",
      buttonBg: "/northCoastShore-d.jpg",
      buttonTextColor: "#1ccfc3",
    },
    {
      src: "/damietta-theme-showcase.png",
      alt: "Cozy Damietta",
      buttonBg: "/cozyDamietta.jpg",
      buttonTextColor: "#ffb973",
    },
    {
      src: "/marsa-theme-showcase.png",
      alt: "Matruh's Coastal Drive",
      buttonBg: "/marsaMatruhCoastalDrive-d.jpg",
      buttonTextColor: "#daa742",
    },
    {
      src: "/alex-theme-showcase.png",
      alt: "Alexandria's Archive",
      buttonBg: "/alexandriaArchive.png",
      buttonTextColor: "white",
    },
    {
      src: "/sinai-theme-showcase.png",
      alt: "Sinai's Sunset Lodge",
      buttonBg: "/sinaiSunsetLodge.jpg",
      buttonTextColor: "white",
    },
  ];

  const handleButtonClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <div className="flex items-start">
      <div className="relative w-full max-w-[500px] h-[300px] mr-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            style={{
              backgroundImage: `url(${image.buttonBg})`,
              color: image.buttonTextColor,
            }}
            className={`px-6 py-4 rounded-xl bg-cover bg-no-repeat ${
              activeImage === index
                ? `border border-[${image.buttonTextColor}] text-white`
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleButtonClick(index)}
          >
            <p className="font-bold text-[1.1rem]">{image.alt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeShowcase;
