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
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Image Display */}
        <div className="lg:col-span-8 relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${activeImage === index ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Theme Selection */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative group overflow-hidden rounded-xl transition-all duration-200 ${activeImage === index ? "ring-2 ring-[#B8860B]" : ""
                }`}
            >
              <div className="relative aspect-[3/1]">
                <Image
                  src={image.buttonBg}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-200 ${activeImage === index
                    ? "bg-black/20"
                    : "bg-black/40 group-hover:bg-black/30"
                    }`}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white text-shadow">
                    {image.alt}
                  </p>
                  {activeImage === index && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;
