"use client";
import { useStopwatch } from "@/app/hooks/useStopwatch";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { useMemo, useState } from "react";
import { Task } from "@/app/types";
import { Button } from "@nextui-org/button";
import Header from "@/app/components/Header";
import { useTheme } from "next-themes";

function StopwatchClient({ tasks }: { tasks: Task[] }) {
  const { time, running, toggleRunning, resetTime } = useStopwatch();
  const [selectedKeys, setSelectedKeys] = useState(
    new Set(["What task are you working on?"])
  );
  const { theme } = useTheme();
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <section
      className="bg-cover w-full h-screen  bg-transition"
      data-theme={theme}
    >
      <Header />

      {/* Centered Clock Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button variant="light">
                <p className="text-[28px] font-bold font-manrope text-white">
                  {selectedValue}
                </p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Tasks"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSelectionChange={setSelectedKeys as any}
            >
              <DropdownSection title="What task are you working on?">
                {tasks.map((task) => (
                  <DropdownItem key={task.title}>
                    <p className="text-2xl my-3 text-[#333]">{task.title}</p>
                    <hr />
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
        <h1 className="font-brico text-[10rem] text-white text-center font-bold mb-6">
          {time}
        </h1>
        <div className="clockContainer flex items-center gap-[8px] w-full">
          <button
            onClick={toggleRunning}
            className="bg-white opacity-95 font-manrope text-h6 font-bold p-5 rounded-xl  w-full py-[12px]"
          >
            <p className="text-[#333]">{running ? "Stop" : "Start"}</p>
          </button>
          <Image
            src="/reset-clock-icon.png"
            alt="reset clock"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={resetTime}
            width={24}
            height={24}
          />
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
