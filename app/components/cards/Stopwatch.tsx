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
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Stopwatch"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const { time, running, toggleRunning, resetTime } = useStopwatch();

  // Handle visibility
  if (!visible) return null;

  return (
    <div
      data-swapy-item="third"
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl  border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="flex flex-col gap-[16px]">
        <span className="flex flex-row justify-between items-center mb-[10px]">
          <Dropdown>
            <DropdownTrigger>
              <h6 className="font-semibold font-manrope text-[1.3rem] text-white">
                {selectedValue}
              </h6>
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
              {tasks.map((task) => (
                <DropdownItem key={task.title}>
                  <p className="text[1.3rem] my-1 text-[#333]">{task.title}</p>
                  <hr />
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <MoreHorizontal className="text-white" />
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
        <h1 className="font-brico text-h1 text-white text-center font-bold">
          {time}
        </h1>
        <div className="flex items-center gap-[8px]">
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
