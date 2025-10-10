'use client'
import { useState, useEffect, useRef, useCallback } from "react";

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

export type PomodoroSettings = {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  longBreakInterval: number; // after how many work sessions
};

const defaultSettings: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};

export function usePomodoro(settings: PomodoroSettings = defaultSettings) {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pomodoro = useRef<number | null>(null);

  // Calculate total seconds for current mode
  const getTotalSeconds = useCallback((currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return settings.workDuration * 60;
    }
  }, [settings.longBreakDuration, settings.shortBreakDuration, settings.workDuration]);

  // Initialize time based on current mode
  useEffect(() => {
    setTime(getTotalSeconds(mode));
  }, [mode, getTotalSeconds]);

  // Check if localStorage is available and retrieve values
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("pomodoroTime");
      const savedRunning = localStorage.getItem("pomodoroRunning") === "true";
      const savedMode = localStorage.getItem("pomodoroMode") as PomodoroMode;
      const savedSessions = localStorage.getItem("pomodoroSessions");

      if (savedTime) {
        setTime(parseInt(savedTime, 10));
      }
      if (savedMode) {
        setMode(savedMode);
      }
      if (savedSessions) {
        setCompletedSessions(parseInt(savedSessions, 10) || 0);
      }
      setRunning(savedRunning);
    }
  }, []);

  const getNextMode = useCallback((): PomodoroMode => {
    if (mode === 'work') {
      const nextSessionCount = completedSessions + 1;
      return nextSessionCount % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  }, [mode, completedSessions, settings.longBreakInterval]);

  const handleSessionComplete = useCallback(() => {
    if (mode === 'work') {
      setCompletedSessions(prev => prev + 1);
    }
    setMode(getNextMode());
    setRunning(false);
    setIsPaused(false);
  }, [mode, getNextMode]);

  useEffect(() => {
    if (running && !isPaused) {
      pomodoro.current = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;

          if (typeof window !== "undefined") {
            localStorage.setItem("pomodoroTime", newTime.toString());
          }

          // When timer reaches 0, switch to next mode
          if (newTime <= 0) {
            handleSessionComplete();
            return getTotalSeconds(getNextMode());
          }

          return newTime;
        });
      }, 1000);
    } else if (pomodoro.current) {
      clearInterval(pomodoro.current);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("pomodoroRunning", running.toString());
      localStorage.setItem("pomodoroMode", mode);
      localStorage.setItem("pomodoroSessions", completedSessions.toString());
    }

    return () => {
      if (pomodoro.current) clearInterval(pomodoro.current);
    };
  }, [running, isPaused, mode, completedSessions, handleSessionComplete, getTotalSeconds, getNextMode]);

  function toggleRunning() {
    if (isPaused) {
      setIsPaused(false);
      setRunning(true);
    } else {
      setRunning(!running);
    }
  }

  function pauseTimer() {
    setIsPaused(true);
    setRunning(false);
  }

  function resetTimer() {
    setTime(getTotalSeconds(mode));
    setRunning(false);
    setIsPaused(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("pomodoroTime", getTotalSeconds(mode).toString());
    }
  }

  function switchMode(newMode: PomodoroMode) {
    setMode(newMode);
    setTime(getTotalSeconds(newMode));
    setRunning(false);
    setIsPaused(false);
  }

  // Function to format time in MM:SS format
  function formatTime(seconds: number) {
    if (isNaN(seconds)) {
      return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  const getModeColor = (currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return 'text-red-400';
      case 'shortBreak':
        return 'text-green-400';
      case 'longBreak':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  const getModeLabel = (currentMode: PomodoroMode) => {
    switch (currentMode) {
      case 'work':
        return 'Work';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Work';
    }
  };

  return {
    time: formatTime(time),
    running,
    mode,
    completedSessions,
    isPaused,
    toggleRunning,
    pauseTimer,
    resetTimer,
    switchMode,
    getModeColor,
    getModeLabel,
    settings
  };
}

