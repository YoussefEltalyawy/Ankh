import { useStopwatch } from "@/app/hooks/useStopwatch";
import Image from "next/image";

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
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl  border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="flex flex-col gap-[16px]">
        <h6 className="font-bold font-manrope text-h6 text-white">Stopwatch</h6>
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
