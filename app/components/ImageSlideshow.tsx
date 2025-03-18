// ImageSlideshow.tsx
"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const images = [
    {
      src: "/showcase3.png",
      alt: "Task Management Interface",
      caption: "Intuitive task management with customizable workflows"
    },
    {
      src: "/showcase4.png",
      alt: "Note-Taking Features",
      caption: "Clean, distraction-free note-taking experience"
    },
    {
      src: "/showcase6.png",
      alt: "Time Tracking Tools",
      caption: "Powerful time tracking to boost your productivity"
    },
    {
      src: "/showcase7.png",
      alt: "Dashboard Overview",
      caption: "Beautiful dashboard that adapts to your workflow"
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'Escape' && isFullScreen) setIsFullScreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, isFullScreen]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="relative">
      {/* Main Slideshow */}
      <div
        className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300
          ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : ''}
        `}
        style={{
          aspectRatio: isFullScreen ? 'auto' : '16/9',
        }}
      >
        {/* Dark overlay when in fullscreen */}
        {isFullScreen && (
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-lg z-0"
            onClick={() => setIsFullScreen(false)}
          />
        )}

        {/* Background pattern */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Images */}
        <AnimatePresence mode="wait">
          {images.map((img, index) => (
            currentIndex === index && (
              <motion.div
                key={`slide-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 overflow-hidden flex items-center justify-center
                  ${isFullScreen ? 'z-10 p-4 md:p-8 lg:p-16' : ''}
                `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-contain ${isFullScreen ? 'max-h-[90vh]' : 'h-full'}`}
                  width={1500}
                  height={900}
                  priority={index === 0}
                  onClick={toggleFullScreen}
                />

                {/* Caption */}
                <div
                  className={`absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent pt-16 pb-4 px-6
                    ${isFullScreen ? 'px-8 pb-6' : ''}
                  `}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg md:text-xl text-white font-bold mb-1">{img.alt}</h3>
                    <p className="text-sm md:text-base text-white/80">{img.caption}</p>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${isFullScreen ? 'px-6 md:px-10 opacity-100' : ''}
        `}>
          <button
            onClick={goToPrev}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#B8860B] backdrop-blur-sm hover:bg-white transition-all transform hover:scale-105 shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#B8860B] backdrop-blur-sm hover:bg-white transition-all transform hover:scale-105 shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className={`absolute bottom-16 right-4 flex items-center gap-2 z-30
          opacity-0 hover:opacity-100 transition-opacity duration-300
          ${isFullScreen ? 'bottom-20 right-8 opacity-100' : ''}
        `}>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-[#B8860B] backdrop-blur-sm hover:bg-white transition-all"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullScreen}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-[#B8860B] backdrop-blur-sm hover:bg-white transition-all"
            aria-label={isFullScreen ? "Exit fullscreen" : "View fullscreen"}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isFullScreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
            }}
            className={`w-2 h-2 rounded-full transition-all ${currentIndex === index
                ? 'w-6 bg-[#B8860B]'
                : 'bg-[#B8860B]/30 hover:bg-[#B8860B]/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
