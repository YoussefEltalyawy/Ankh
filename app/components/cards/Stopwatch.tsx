import { useStopwatch } from "@/app/hooks/useStopwatch";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
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

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { time, running, toggleRunning, resetTime } = useStopwatch();

  // Handle visibility
  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out h-full  overflow-hidden
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="flex flex-col gap-[16px] h-full">
        <span className="flex flex-row justify-between items-center mb-[10px] card-handle cursor-grab">
          <div className="flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <h6 className="font-semibold font-manrope text-[1.3rem] text-white cursor-pointer">
                  {selectedValue}
                </h6>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Tasks"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
              >
                {tasks.map((task) => (
                  <DropdownItem key={task.id}>
                    <p className="text[1.3rem] my-1 text-[#333]">{task.title}</p>
                    <hr />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <MoreHorizontal className="text-white cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownSection title="Actions">
                <DropdownItem key="full-screen">
                  <Link href={"/stopwatch/fullscreen"}>
                    <p className="text-[#333]">Full Screen</p>
                  </Link>
                </DropdownItem>
                <DropdownItem key="new">
                  <p className="text-[#333]">Minimize</p>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </span>
        {/* Display the time returned from useStopwatch */}
        <div className="overflow-y-auto flex-grow">
          <div className="flex justify-center items-center h-full">
            <h1 className="font-brico text-[3.5rem] text-white text-center font-bold">
              {time}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-[8px] mt-auto">
          <button
            onClick={toggleRunning}
            className="bg-white opacity-95 font-manrope text-h6 font-bold p-5 rounded-xl px-[32px] py-[12px] w-full"
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
    </div>
  );
}

export default StopwatchCard;