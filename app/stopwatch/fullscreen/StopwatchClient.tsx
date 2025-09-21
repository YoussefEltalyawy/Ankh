"use client";
import { useStopwatch } from "@/app/hooks/useStopwatch";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
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
import Header from "@/app/components/Header";
import { useTheme } from "next-themes";

function StopwatchClient({ tasks }: { tasks: Task[] }) {
  const { time, running, toggleRunning, resetTime } = useStopwatch();
  const [selectedTask, setSelectedTask] = useState("What task are you working on?");
  const { theme } = useTheme();

  return (
    <section
      className="bg-cover w-full h-screen bg-transition"
      data-theme={theme}
    >
      <Header />

      {/* Centered Clock Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                <p className="text-[28px] font-bold font-manrope text-white">
                  {selectedTask}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[300px] bg-white">
              <DropdownMenuLabel>What task are you working on?</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {tasks.map((task) => (
                <DropdownMenuItem 
                  key={task.id} 
                  className="cursor-pointer"
                  onClick={() => setSelectedTask(task.title)}
                >
                  <p className="text-lg my-2 text-[#333] w-full">{task.title}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h1 className="font-brico text-[10rem] text-white text-center font-bold mb-6">
          {time}
        </h1>
        <div className="clockContainer flex items-center gap-[8px] w-full">
          <Button
            onClick={toggleRunning}
            className="w-full bg-white text-[#333] hover:bg-white/90 font-manrope font-bold h-12 text-base"
          >
            {running ? "Stop" : "Start"}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 hover:bg-white/10"
            onClick={resetTime}
          >
            <Image
              src="/reset-clock-icon.png"
              alt="reset clock"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </Button>
        </div>
      </div>
      <span>
        <Link href="/dashboard">
          <Undo2 className="text-white absolute bottom-5 left-5" />
        </Link>
      </span>
    </section>
  );
}

export default StopwatchClient;
