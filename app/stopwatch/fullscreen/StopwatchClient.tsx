"use client";
import { useStopwatch } from "@/app/hooks/useStopwatch";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useMemo, useState } from "react";
import { Task } from "@/app/types";

function StopwatchClient({ tasks }: { tasks: Task[] }) {
  const { time, running, toggleRunning, resetTime } = useStopwatch();
  const [selectedKeys, setSelectedKeys] = useState(
    new Set(["What task are you working on?"])
  );
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <section className="bg-cozy bg-cover w-full h-screen min-h-screen relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-[140px] pt-[80px] pb-[30px] flex justify-between items-center">
        <h1 className="font-manrope text-h2 text-white font-bold">Ankh</h1>
        <LogoutLink>
          <button className="bg-white opacity-95 font-manrope text-h6 font-bold p-2 rounded-xl px-4">
            Log Out
          </button>
        </LogoutLink>
      </div>

      {/* Centered Clock Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <p className="text-2xl font-bold font-manrope text-white">
                {selectedValue}
              </p>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {tasks.map((task) => (
                <DropdownItem key={task.title}>{task.title}</DropdownItem> //here
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <h1 className="font-brico text-8xl text-white text-center font-bold mb-6 mt-7">
          {time}
        </h1>
        <div className="clockContainer flex items-center gap-[8px] w-full">
          <button
            onClick={toggleRunning}
            className="bg-white opacity-95 font-manrope text-h6 font-bold p-5 rounded-xl  w-full py-[12px]"
          >
            {running ? "Stop" : "Start"}
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
