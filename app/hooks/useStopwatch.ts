import { useEffect, useRef, useState } from "react";

export const useStopwatch = () => {
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number>();

  const toggleRunning = () => {
    setRunning((prev) => !prev);
    if (!running) {
      // Start the stopwatch
      startTimeRef.current = Date.now() - elapsedTime;
    } // No action needed when pausing
  };

  const resetTime = () => {
    setElapsedTime(0);
    startTimeRef.current = null;
    if (running) toggleRunning(); // Stop if running
  };

  useEffect(() => {
    const updateElapsedTime = () => {
      if (running && startTimeRef.current !== null) {
        setElapsedTime(Date.now() - startTimeRef.current);
      }
      requestRef.current = requestAnimationFrame(updateElapsedTime);
    };

    requestRef.current = requestAnimationFrame(updateElapsedTime);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [running]);

  const time = new Date(elapsedTime).toISOString().substr(11, 8); // Format as HH:MM:SS

  return { time, running, toggleRunning, resetTime };
};
