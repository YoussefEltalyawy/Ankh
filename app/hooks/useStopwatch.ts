// 'use client'
import { useState, useEffect, useRef, useCallback } from "react";

interface Lap {
  id: string;
  time: number;
  totalTime: string;
  lapTime: string;
}

export function useStopwatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lastLapTime, setLastLapTime] = useState<number>(0);
  const stopwatch = useRef<number | null>(null);
  const lapId = useRef<number>(0);

  // Load saved state from localStorage
  const loadState = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const savedTime = localStorage.getItem("stopwatchTime");
    const savedRunning = localStorage.getItem("stopwatchRunning") === "true";
    const savedLaps = localStorage.getItem("stopwatchLaps");
    const savedLastLapTime = localStorage.getItem("stopwatchLastLapTime");
    const savedLapId = localStorage.getItem("stopwatchLapId");

    if (savedTime) setTime(parseInt(savedTime, 10) || 0);
    if (savedLaps) setLaps(JSON.parse(savedLaps));
    if (savedLastLapTime) setLastLapTime(parseInt(savedLastLapTime, 10) || 0);
    if (savedLapId) lapId.current = parseInt(savedLapId, 10) || 0;
    
    return savedRunning;
  }, []);

  // Save state to localStorage
  const saveState = useCallback(() => {
    if (typeof window === "undefined") return;
    
    localStorage.setItem("stopwatchTime", time.toString());
    localStorage.setItem("stopwatchRunning", running.toString());
    localStorage.setItem("stopwatchLaps", JSON.stringify(laps));
    localStorage.setItem("stopwatchLastLapTime", lastLapTime.toString());
    localStorage.setItem("stopwatchLapId", lapId.current.toString());
  }, [time, running, laps, lastLapTime]);

  // Load state on mount
  useEffect(() => {
    const savedRunning = loadState();
    if (savedRunning !== undefined) {
      setRunning(savedRunning);
    }
  }, [loadState]);

  // Save state when it changes
  useEffect(() => {
    saveState();
  }, [saveState]);

  // Handle timer logic
  useEffect(() => {
    if (running) {
      stopwatch.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (stopwatch.current) {
      clearInterval(stopwatch.current);
    }

    return () => {
      if (stopwatch.current) clearInterval(stopwatch.current);
    };
  }, [running]);

  const toggleRunning = useCallback(() => {
    setRunning((prev) => !prev);
  }, []);

  const resetTime = useCallback(() => {
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
    lapId.current = 0;
  }, []);

  const addLap = useCallback(() => {
    if (!running) return;
    
    const newLap: Lap = {
      id: `lap-${lapId.current++}`,
      time: time,
      totalTime: formatTime(time),
      lapTime: formatTime(time - lastLapTime)
    };
    
    setLaps(prevLaps => [newLap, ...prevLaps]);
    setLastLapTime(time);
  }, [running, time, lastLapTime]);

  const clearLaps = useCallback(() => {
    setLaps([]);
    setLastLapTime(0);
  }, []);

  // Function to format time in HH:MM:SS format
  function formatTime(seconds: number): string {
    if (isNaN(seconds)) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(secs).padStart(2, "0")
    ].join(':');
  }

  return { 
    time: formatTime(time), 
    running, 
    toggleRunning, 
    resetTime,
    laps,
    addLap,
    clearLaps,
    canAddLap: running && time > 0
  };
}
