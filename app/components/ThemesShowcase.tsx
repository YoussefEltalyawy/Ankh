"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface ThemeImage {
  src: string;
  alt: string;
  buttonBg: string;
  buttonTextColor: string;
  description: string;
}

const ThemeShowcase = () => {
  const [activeTheme, setActiveTheme] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  const themes: ThemeImage[] = [
    {
      src: "/cairo-theme-showcase.png",
      alt: "Cairo's Late Drive",
      buttonBg: "/cairoLateDrive-d.jpg",
      buttonTextColor: "#ffd24b",
      description: "Inspired by Cairo's vibrant cityscape at sunset, with warm golden tones for focused productivity."
    },
    {
      src: "/northc-theme-showcase.png",
      alt: "North Coast's Shore",
      buttonBg: "/northCoastShore-d.jpg",
      buttonTextColor: "#1ccfc3",
      description: "Cool turquoise inspired by the Mediterranean coast, creating a calm, peaceful workspace."
    },
    {
      src: "/marsa-theme-showcase.png",
      alt: "Matruh's Coastal Drive",
      buttonBg: "/marsaMatruhCoastalDrive-d.jpg",
      buttonTextColor: "#daa742",
      description: "Sandy amber tones of Marsa Matruh's beaches for a warm, inviting work environment."
    },
    {
      src: "/alex-theme-showcase.png",
      alt: "Alexandria's Archive",
      buttonBg: "/alexandriaArchive.png",
      buttonTextColor: "white",
      description: "A nostalgic palette inspired by the historic Alexandria Library, perfect for deep focus."
    },
  ];

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveTheme((prev) => (prev === themes.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, themes.length]);

  const nextTheme = () => {
    setIsAutoplay(false);
    setActiveTheme((prev) => (prev === themes.length - 1 ? 0 : prev + 1));
  };

  const prevTheme = () => {
    setIsAutoplay(false);
    setActiveTheme((prev) => (prev === 0 ? themes.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
        {/* Main Preview - Now larger */}
        <div className="lg:col-span-10">
          <div className="relative aspect-[16/9] rounded-2xl bg-white shadow-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={themes[activeTheme].src}
                  alt={themes[activeTheme].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={prevTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#B8860B] backdrop-blur-sm hover:bg-white transition-all transform hover:scale-105 shadow-md"
                aria-label="Previous theme"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#B8860B] backdrop-blur-sm hover:bg-white transition-all transform hover:scale-105 shadow-md"
                aria-label="Next theme"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Theme title overlay */}
            <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent pt-20 pb-6 px-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themes[activeTheme].buttonTextColor }}></div>
                <h3 className="text-xl text-white font-bold">{themes[activeTheme].alt}</h3>
              </div>
            </div>

            {/* Theme indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {themes.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  onClick={() => {
                    setActiveTheme(index);
                    setIsAutoplay(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${activeTheme === index ? "w-6 bg-white" : "bg-white/40 hover:bg-white/60"
                    }`}
                  aria-label={`Switch to ${themes[index].alt}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Theme Selection - Now as a horizontal strip beneath the main image */}
        <div className="lg:col-span-10">
          <div className="flex flex-wrap gap-4 justify-center">
            {themes.map((theme, index) => (
              <motion.button
                key={`theme-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTheme(index);
                  setIsAutoplay(false);
                }}
                className={`flex items-center p-3 rounded-xl transition-all bg-white shadow-sm 
                  ${activeTheme === index
                    ? "ring-2 ring-[#B8860B]"
                    : "hover:bg-white/80 hover:shadow"
                  }`}
              >
                <div className="relative w-20 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={theme.buttonBg}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium text-black/80">{theme.alt}</p>
                </div>
                {activeTheme === index && (
                  <Check className="ml-4 text-[#B8860B]" size={16} />
                )}
              </motion.button>
            ))}

            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${isAutoplay
                ? "bg-[#B8860B]/10 text-[#B8860B] font-medium"
                : "bg-[#B8860B]/5 text-black/50 hover:bg-[#B8860B]/10 hover:text-[#B8860B]"
                }`}
            >
              {isAutoplay ? "Autoplay: On" : "Autoplay: Off"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;
