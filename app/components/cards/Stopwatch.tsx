import { useStopwatch } from "@/app/hooks/useStopwatch";
import { MoreHorizontal, Flag, RotateCcw } from "lucide-react";
import Image from "next/image";
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
  const [showLaps, setShowLaps] = useState(false);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { 
    time, 
    running, 
    toggleRunning, 
    resetTime, 
    laps, 
    addLap, 
    clearLaps,
    canAddLap 
  } = useStopwatch();

  // Handle visibility
  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out h-full max-h-full overflow-hidden flex flex-col
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="flex flex-col gap-[16px] h-full">
        <div className="flex flex-row justify-between items-center mb-[10px] card-handle cursor-grab">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold font-manrope text-[1.3rem] text-white p-0 h-auto hover:bg-transparent hover:opacity-80">
                  {selectedValue}
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
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-white/70 hover:text-white hover:bg-white/10 h-6 px-2"
              onClick={() => setShowLaps(!showLaps)}
            >
              {showLaps ? 'Hide Laps' : 'Show Laps'}
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
                {laps.length > 0 && (
                  <DropdownMenuItem 
                    onClick={() => clearLaps()}
                    className="text-red-500 focus:text-red-500"
                  >
                    Clear Laps
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  Minimize
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Main Timer Display */}
        <div className="overflow-y-auto grow">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="font-brico text-[3.5rem] text-white text-center font-bold">
              {time}
            </h1>
            
            {/* Laps Section */}
            {showLaps && (
              <div className="w-full mt-4 max-h-[200px] overflow-y-auto border-t border-white/10 pt-3">
                {laps.length === 0 ? (
                  <p className="text-center text-white/50 text-sm py-4">No laps recorded yet</p>
                ) : (
                  <div className="space-y-2">
                    {laps.map((lap, index) => (
                      <div key={lap.id} className="flex justify-between items-center py-1 px-2 rounded hover:bg-white/5">
                        <div className="flex items-center gap-2">
                          <Flag className="h-3 w-3 text-white/50" />
                          <span className="text-white/70 text-sm">Lap {laps.length - index}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/70 text-sm">{lap.lapTime}</span>
                          <span className="text-white/50 text-xs">{lap.totalTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center gap-[8px] mt-auto">
          <div className="flex-1 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 bg-transparent border-white/20 hover:bg-white/10"
              onClick={resetTime}
              disabled={running}
            >
              <RotateCcw className="h-4 w-4 text-white" />
            </Button>
            <Button
              onClick={toggleRunning}
              className="flex-1 bg-white text-[#333] hover:bg-white/90 font-manrope font-bold h-11"
            >
              {running ? "Stop" : "Start"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 bg-transparent border-white/20 hover:bg-white/10"
              onClick={addLap}
              disabled={!canAddLap}
            >
              <Flag className={`h-4 w-4 ${canAddLap ? 'text-white' : 'text-white/30'}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StopwatchCard;