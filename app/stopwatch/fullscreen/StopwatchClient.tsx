"use client";
import { useStopwatch } from "@/app/hooks/useStopwatch";
import { usePomodoro, PomodoroMode } from "@/app/hooks/usePomodoro";
import { ArrowLeft, Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Task } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

function StopwatchClient({ tasks }: { tasks: Task[] }) {
  const [timerMode, setTimerMode] = useState<"stopwatch" | "pomodoro">("pomodoro");
  const [selectedTask, setSelectedTask] = useState("What task are you working on?");
  const { theme } = useTheme();

  const {
    time: stopwatchTime,
    running: stopwatchRunning,
    toggleRunning: toggleStopwatch,
    resetTime: resetStopwatch,
  } = useStopwatch();

  const {
    time: pomodoroTime,
    running: pomodoroRunning,
    mode: pomodoroMode,
    completedSessions,
    isPaused,
    toggleRunning: togglePomodoro,
    resetTimer: resetPomodoro,
    switchMode,
    settings,
  } = usePomodoro();

  const isRunning = timerMode === "stopwatch" ? stopwatchRunning : pomodoroRunning;
  const time = timerMode === "stopwatch" ? stopwatchTime : pomodoroTime;
  const toggleRunning = timerMode === "stopwatch" ? toggleStopwatch : togglePomodoro;
  const resetTime = timerMode === "stopwatch" ? resetStopwatch : resetPomodoro;

  // Pomodoro progress
  const pomodoroProgress = useMemo(() => {
    const totalSeconds =
      pomodoroMode === "work"
        ? settings.workDuration * 60
        : pomodoroMode === "shortBreak"
        ? settings.shortBreakDuration * 60
        : settings.longBreakDuration * 60;
    const parts = pomodoroTime.split(":");
    const mins = parseInt(parts[0]) || 0;
    const secs = parseInt(parts[1]) || 0;
    const remaining = mins * 60 + secs;
    return totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;
  }, [pomodoroTime, pomodoroMode, settings]);

  const handleNextMode = () => {
    if (pomodoroMode === "work") {
      switchMode(completedSessions + 1 >= settings.longBreakInterval ? "longBreak" : "shortBreak");
    } else {
      switchMode("work");
    }
  };

  return (
    <section
      className="bg-cover w-full h-screen bg-transition flex flex-col"
      data-theme={theme}
    >
      {/* Gold progress bar at the very top */}
      {timerMode === "pomodoro" && (
        <div className="w-full h-1 bg-white/5">
          <div
            className="h-full bg-[#C0A062] transition-[width] duration-1000 ease-linear"
            style={{ width: `${pomodoroProgress}%` }}
          />
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-manrope font-medium">Dashboard</span>
        </Link>

        {/* Mode toggle */}
        <div className="flex bg-white/5 rounded-full p-0.5 border border-white/5">
          <button
            onClick={() => setTimerMode("stopwatch")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              timerMode === "stopwatch"
                ? "bg-white/15 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setTimerMode("pomodoro")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              timerMode === "pomodoro"
                ? "bg-white/15 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Pomodoro
          </button>
        </div>
      </div>

      {/* Main content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {timerMode === "stopwatch" ? (
          <div className="flex flex-col items-center gap-6">
            {/* Task selector ABOVE time */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white/50 hover:text-white/80 text-sm font-medium transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20">
                  {selectedTask === "What task are you working on?" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C0A062]/60" />
                      {selectedTask}
                    </span>
                  ) : (
                    selectedTask
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[300px] bg-[#1a1a1a] border-white/10 text-white">
                <DropdownMenuLabel className="text-white/60 text-xs">What task are you working on?</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {tasks.length === 0 ? (
                  <DropdownMenuItem className="text-white/40 cursor-default" disabled>
                    No incomplete tasks
                  </DropdownMenuItem>
                ) : (
                  tasks.map((task) => (
                    <DropdownMenuItem
                      key={task.id}
                      className="cursor-pointer text-white focus:bg-white/10 focus:text-white"
                      onClick={() => setSelectedTask(task.title)}
                    >
                      <p className="text-base">{task.title}</p>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Large time display */}
            <h1 className="font-brico text-[9rem] md:text-[12rem] text-white text-center font-bold leading-none tracking-tight">
              {time}
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* Task selector ABOVE time */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white/50 hover:text-white/80 text-sm font-medium transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20">
                  {selectedTask === "What task are you working on?" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C0A062]/60" />
                      {selectedTask}
                    </span>
                  ) : (
                    selectedTask
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[300px] bg-[#1a1a1a] border-white/10 text-white">
                <DropdownMenuLabel className="text-white/60 text-xs">What task are you working on?</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {tasks.map((task) => (
                  <DropdownMenuItem
                    key={task.id}
                    className="cursor-pointer text-white focus:bg-white/10 focus:text-white"
                    onClick={() => setSelectedTask(task.title)}
                  >
                    <p className="text-base">{task.title}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Large time display */}
            <h1 className="font-brico text-[9rem] md:text-[12rem] text-white text-center font-bold leading-none tracking-tight">
              {pomodoroTime}
            </h1>

            {/* Mode label */}
            <span className="text-sm font-medium text-[#C0A062] px-3 py-1 rounded-full bg-[#C0A062]/10">
              {pomodoroMode === "work" ? "Focus" : pomodoroMode === "shortBreak" ? "Short Break" : "Long Break"}
            </span>

            {/* Session dots */}
            <div className="flex gap-2 items-center">
              {Array.from({ length: settings.longBreakInterval }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < completedSessions
                      ? "bg-[#C0A062] scale-100"
                      : "bg-white/10 scale-90"
                  }`}
                />
              ))}
            </div>

            {/* Mode switcher */}
            <div className="flex gap-2">
              {(["work", "shortBreak", "longBreak"] as PomodoroMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => switchMode(mode)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pomodoroMode === mode
                      ? "text-white border border-white/20 bg-white/10"
                      : "text-white/30 hover:text-white/50 border border-transparent"
                  }`}
                >
                  {mode === "work" ? "Focus" : mode === "shortBreak" ? "Short Break" : "Long Break"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex justify-center items-center gap-3 px-6 pb-10">
        <Button
          onClick={resetTime}
          variant="ghost"
          size="icon"
          className="h-12 w-12 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          onClick={toggleRunning}
          className={`h-12 px-10 font-manrope font-bold text-base rounded-2xl transition-all duration-200 ${
            isRunning
              ? "bg-white/15 text-white hover:bg-white/20 border border-white/10"
              : "bg-white text-[#1a1a1a] hover:bg-white/90"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              {timerMode === "pomodoro" && isPaused ? "Resume" : "Pause"}
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start
            </>
          )}
        </Button>

        {timerMode === "pomodoro" && (
          <Button
            onClick={handleNextMode}
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        )}
      </div>
    </section>
  );
}

export default StopwatchClient;
