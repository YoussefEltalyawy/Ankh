import { useStopwatch } from "@/app/hooks/useStopwatch";
import { usePomodoro } from "@/app/hooks/usePomodoro";
import { MoreHorizontal, Play, Pause, RotateCcw } from "lucide-react";
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
import { useMemo, useState } from "react";

type StopwatchProps = {
  visible: boolean;
  opacity: number;
  tasks: Task[];
};

function StopwatchCard({ visible, opacity, tasks }: StopwatchProps) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(["Stopwatch"]));
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'pomodoro'>('stopwatch');

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { time: stopwatchTime, running: stopwatchRunning, toggleRunning: toggleStopwatch, resetTime: resetStopwatch } = useStopwatch();
  const {
    time: pomodoroTime,
    running: pomodoroRunning,
    mode: pomodoroMode,
    completedSessions,
    isPaused,
    toggleRunning: togglePomodoro,
    pauseTimer,
    resetTimer: resetPomodoro,
    switchMode,
    getModeLabel
  } = usePomodoro();

  const isRunning = timerMode === 'stopwatch' ? stopwatchRunning : pomodoroRunning;
  const time = timerMode === 'stopwatch' ? stopwatchTime : pomodoroTime;
  const toggleRunning = timerMode === 'stopwatch' ? toggleStopwatch : togglePomodoro;
  const resetTime = timerMode === 'stopwatch' ? resetStopwatch : resetPomodoro;

  // Handle visibility
  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out h-full max-h-full overflow-hidden
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="flex flex-col gap-[16px] h-full">
        <span className="flex flex-row justify-between items-center mb-[10px] card-handle cursor-grab">
          <h6 className="font-semibold font-manrope text-h6 text-white">Stopwatch</h6>

          <div className="flex items-center gap-2">
            {/* Simple Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTimerMode(timerMode === 'stopwatch' ? 'pomodoro' : 'stopwatch')}
              className="h-8 px-3 text-xs text-white hover:bg-white/10"
            >
              {timerMode === 'stopwatch' ? 'Pomodoro' : 'Timer'}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                  <MoreHorizontal className="h-4 w-4 text-white" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={"/stopwatch/fullscreen"} className="w-full cursor-pointer">
                    Full Screen
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Minimize
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </span>

        {/* Display the time */}
        <div className="overflow-y-auto grow">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-brico text-[3.5rem] text-center font-bold text-white">
              {time}
            </h1>

            {/* Task Selection (only for stopwatch mode) */}
            {timerMode === 'stopwatch' && (
              <div className="mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="font-semibold font-manrope text-lg text-white p-2 h-auto hover:bg-transparent hover:opacity-80">
                      {selectedValue === "Stopwatch" ? "Select Task" : selectedValue}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[200px] bg-white">
                    <DropdownMenuLabel>Select Task</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {tasks.map((task) => (
                      <DropdownMenuItem
                        key={task.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedKeys(new Set([task.title]))}
                      >
                        <p className="text-[1rem] my-1 text-[#333] w-full">{task.title}</p>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Pomodoro Mode Display */}
            {timerMode === 'pomodoro' && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="font-semibold font-manrope text-lg text-white">
                  {getModeLabel(pomodoroMode)}
                </span>
                <span className="text-white/60 text-sm">
                  ({completedSessions} sessions)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Simple Pomodoro Mode Controls - Only show when in Pomodoro mode */}
        {timerMode === 'pomodoro' && (
          <div className="flex justify-center gap-1 mb-4">
            <Button
              variant={pomodoroMode === 'work' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => switchMode('work')}
              className="text-xs h-7 px-2"
            >
              Work
            </Button>
            <Button
              variant={pomodoroMode === 'shortBreak' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => switchMode('shortBreak')}
              className="text-xs h-7 px-2"
            >
              Short Break
            </Button>
            <Button
              variant={pomodoroMode === 'longBreak' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => switchMode('longBreak')}
              className="text-xs h-7 px-2"
            >
              Long Break
            </Button>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-[8px] mt-auto">
          <Button
            onClick={toggleRunning}
            className="flex-1 bg-white text-[#333] hover:bg-white/90 font-manrope font-bold h-11"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                {timerMode === 'pomodoro' && isPaused ? 'Resume' : 'Pause'}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>

          {timerMode === 'pomodoro' && isRunning && !isPaused && (
            <Button
              onClick={pauseTimer}
              variant="outline"
              className="h-11 px-3 border-white/30 text-white hover:bg-white/10"
            >
              <Pause className="w-4 h-4" />
            </Button>
          )}

          <Button
            onClick={resetTime}
            variant="outline"
            className="h-11 px-3 border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StopwatchCard;