// 'use client'
import { useState, useEffect, useRef } from "react";

export function useStopwatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const stopwatch = useRef<number | null>(null);

  // Check if localStorage is available and only then retrieve values
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("stopwatchTime");
      const savedRunning = localStorage.getItem("stopwatchRunning") === "true";

      // Ensure savedTime is parsed as an integer and fallback to 0 if null
      if (savedTime) {
        setTime(parseInt(savedTime, 10) || 0);
      }
      setRunning(savedRunning);
    }
  }, []);

  useEffect(() => {
    if (running) {
      stopwatch.current = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          if (typeof window !== "undefined") {
            localStorage.setItem("stopwatchTime", newTime.toString());
          }
          return newTime;
        });
      }, 1000);
    } else if (stopwatch.current) {
      clearInterval(stopwatch.current);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("stopwatchRunning", running.toString());
    }

    return () => {
      if (stopwatch.current) clearInterval(stopwatch.current);
    };
  }, [running]);

  function toggleRunning() {
    setRunning(!running);
  }

  function resetTime() {
    setTime(0);
    if (typeof window !== "undefined") {
      localStorage.setItem("stopwatchTime", "0");
    }
  }

  // Function to format time in HH:MM:SS format
  function formatTime(seconds: number) {
    if (isNaN(seconds)) {
      return "00:00:00"; // Fallback if seconds is NaN
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Ensure two digits for hours, minutes, and seconds
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }

  return { time: formatTime(time), running, toggleRunning, resetTime };
}
