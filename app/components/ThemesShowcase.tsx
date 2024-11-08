"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Image {
  src: string;
  alt: string;
  buttonBg: string;
  buttonTextColor: string;
}

const ThemeShowcase = ({ layout = "horizontal" }) => {
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
    // {
    //   src: "/damietta-theme-showcase.png",
    //   alt: "Cozy Damietta",
    //   buttonBg: "/cozyDamietta.jpg",
    //   buttonTextColor: "#ffb973",
    // },
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
    // {
    //   src: "/sinai-theme-showcase.png",
    //   alt: "Sinai's Sunset Lodge",
    //   buttonBg: "/sinaiSunsetLodge.jpg",
    //   buttonTextColor: "white",
    // },
  ];

  const handleButtonClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <div
      className={`container mx-auto p- ${
        layout === "vertical" ? "max-w-4xl" : "max-w-7xl"
      }`}
    >
      <div
        className={`${
          layout === "vertical"
            ? "flex flex-col gap-8"
            : "flex flex-col lg:flex-row gap-8"
        }`}
      >
        {/* Image Showcase */}
        <div
          className={`relative ${
            layout === "vertical" ? "w-full h-[600px]" : "lg:w-2/3 h-[500px]"
          }`}
        >
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
                className="rounded-2xl"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Buttons Grid */}
        <div
          className={`${
            layout === "vertical"
              ? "grid grid-cols-2 lg:grid-cols-3 gap-4"
              : "lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          }`}
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
              <button
                style={{
                  backgroundImage: `url(${image.buttonBg})`,
                }}
                className={`
                  relative w-full group overflow-hidden rounded-xl
                  transition-all duration-300
                  p-6 h-24 bg-cover bg-center
                `}
                onClick={() => handleButtonClick(index)}
              >
                {/* Dark overlay that's lighter when active */}
                <div
                  className={`
                    absolute inset-0 transition-all duration-300
                    ${
                      activeImage === index
                        ? "bg-black bg-opacity-20"
                        : "bg-black bg-opacity-50 group-hover:bg-opacity-40"
                    }
                  `}
                />

                {/* Left side indicator bar with slide-up animation */}
                <div
                  className={`
                    absolute left-0 bottom-0 w-1
                    transition-all duration-300 ease-out
                    ${
                      activeImage === index
                        ? "h-full opacity-100 transform translate-y-0"
                        : "h-0 opacity-0 transform translate-y-full"
                    }
                  `}
                  style={{ backgroundColor: image.buttonTextColor }}
                />

                {/* Text content */}
                <div className="relative z-10 flex items-center justify-between">
                  <p
                    className={`
                      font-bold text-lg transition-all duration-300 ease-out
                      ${activeImage === index ? "translate-x-3" : ""}
                    `}
                    style={{ color: image.buttonTextColor }}
                  >
                    {image.alt}
                  </p>

                  {/* Active dot indicator */}
                  <div
                    className={`
                      w-2 h-2 rounded-full ml-2
                      transition-all duration-300
                      ${
                        activeImage === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0"
                      }
                    `}
                    style={{ backgroundColor: image.buttonTextColor }}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;
