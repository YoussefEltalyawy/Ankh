import { useStopwatch } from "@/app/hooks/useStopwatch";
import { usePomodoro, PomodoroMode } from "@/app/hooks/usePomodoro";
import { MoreHorizontal, Play, Pause, RotateCcw, Maximize2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Task } from "@/app/types";
import { useState } from "react";

type StopwatchProps = {
  visible: boolean;
  opacity: number;
  tasks: Task[];
};

// Session dots
function SessionDots({ completed, total }: { completed: number; total: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i < completed ? "bg-[#C0A062] scale-100" : "bg-white/15 scale-90"
          }`}
        />
      ))}
    </div>
  );
}

function StopwatchCard({ visible, opacity, tasks }: StopwatchProps) {
  const [timerMode, setTimerMode] = useState<"stopwatch" | "pomodoro">("stopwatch");
  const [selectedTask, setSelectedTask] = useState("Select Task");

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

  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px]
        transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
        flex flex-col h-full max-h-full overflow-hidden
      `}
    >
      {/* Header */}
      <div
        className="flex flex-row justify-between items-center mb-[12px] card-handle cursor-grab select-none"
        onDragStart={(e) => e.preventDefault()}
      >
        <h6 className="font-semibold font-manrope text-h6 text-white pointer-events-none">
          {timerMode === "stopwatch" ? "Stopwatch" : "Pomodoro"}
        </h6>
        <div
          className="flex items-center gap-1.5"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Mode toggle pill */}
          <div className="flex bg-white/5 rounded-full p-0.5 border border-white/5">
            <button
              onClick={() => setTimerMode("stopwatch")}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
                timerMode === "stopwatch"
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Timer
            </button>
            <button
              onClick={() => setTimerMode("pomodoro")}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
                timerMode === "pomodoro"
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Pomodoro
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10">
                <MoreHorizontal className="h-3.5 w-3.5 text-white/60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#1a1a1a] border-white/10 text-white">
              <DropdownMenuLabel className="text-white/60 text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                <Link href="/stopwatch/fullscreen" className="w-full flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Full Screen
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Timer display */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        {timerMode === "stopwatch" ? (
          <div className="flex flex-col items-center gap-4">
            {/* Task selector ABOVE time */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white/50 hover:text-white/80 text-xs font-medium transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20">
                  {selectedTask === "Select Task" ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C0A062]/60" />
                      Select Task
                    </span>
                  ) : (
                    selectedTask
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px] bg-[#1a1a1a] border-white/10 text-white">
                <DropdownMenuLabel className="text-white/60 text-xs">Select Task</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {tasks.length === 0 ? (
                  <DropdownMenuItem className="text-white/40 cursor-default" disabled>
                    No tasks available
                  </DropdownMenuItem>
                ) : (
                  tasks.map((task) => (
                    <DropdownMenuItem
                      key={task.id}
                      className="cursor-pointer text-white focus:bg-white/10 focus:text-white"
                      onClick={() => setSelectedTask(task.title)}
                    >
                      <span className="truncate">{task.title}</span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Time */}
            <h1 className="font-brico text-[3.2rem] text-white font-bold tracking-tight leading-none">
              {time}
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Task selector ABOVE time */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white/50 hover:text-white/80 text-xs font-medium transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20">
                  {selectedTask === "Select Task" ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C0A062]/60" />
                      Select Task
                    </span>
                  ) : (
                    selectedTask
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px] bg-[#1a1a1a] border-white/10 text-white">
                <DropdownMenuLabel className="text-white/60 text-xs">Select Task</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {tasks.map((task) => (
                  <DropdownMenuItem
                    key={task.id}
                    className="cursor-pointer text-white focus:bg-white/10 focus:text-white"
                    onClick={() => setSelectedTask(task.title)}
                  >
                    <span className="truncate">{task.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Time */}
            <h1 className="font-brico text-[3.2rem] text-white font-bold leading-none">
              {pomodoroTime}
            </h1>

            {/* Mode label */}
            <span className="text-[11px] font-medium text-[#C0A062] px-2 py-0.5 rounded-full bg-[#C0A062]/10">
              {pomodoroMode === "work"
                ? "Focus"
                : pomodoroMode === "shortBreak"
                ? "Short Break"
                : "Long Break"}
            </span>

            {/* Session dots */}
            <SessionDots
              completed={completedSessions}
              total={settings.longBreakInterval}
            />

            {/* Mode switcher */}
            <div className="flex gap-1">
              {(["work", "shortBreak", "longBreak"] as PomodoroMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => switchMode(mode)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-200 ${
                    pomodoroMode === mode
                      ? "text-white border border-white/20 bg-white/10"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {mode === "work" ? "Focus" : mode === "shortBreak" ? "Short" : "Long"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mt-auto">
        <Button
          onClick={toggleRunning}
          className={`flex-1 font-manrope font-bold h-10 text-sm rounded-xl transition-all duration-200 ${
            isRunning
              ? "bg-white/15 text-white hover:bg-white/20 border border-white/10"
              : "bg-white text-[#1a1a1a] hover:bg-white/90"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 mr-2" />
              {timerMode === "pomodoro" && isPaused ? "Resume" : "Pause"}
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 mr-2" />
              Start
            </>
          )}
        </Button>
        <Button
          onClick={resetTime}
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-white/40 hover:text-white hover:bg-white/10 rounded-xl"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default StopwatchCard;
