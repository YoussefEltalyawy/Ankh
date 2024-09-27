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

type StopwatchProps = {
  visible: boolean;
  opacity: number;
};

function StopwatchCard({ visible, opacity }: StopwatchProps) {
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
          <h6 className="font-semibold font-manrope text-h6 text-white">
            Stopwatch
          </h6>
          <Dropdown>
            <DropdownTrigger>
              <MoreHorizontal className="text-white" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownSection title="Actions">
                <DropdownItem key="full-screen">
                  <Link href={"/stopwatch/fullscreen"}>Full Screen</Link>
                </DropdownItem>
                <DropdownItem key="new">Minimize</DropdownItem>
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
    </div>
  );
}

export default StopwatchCard;
