import Image from "next/image";
import { useState } from "react";

interface DockProps {
  onToggleTimer: (toggle: boolean) => void;
  onToggleTasks: (toggle: boolean) => void;
  onToggleNotes: (toggle: boolean) => void;
  onToggleMusic: () => void;
  onToggleSettings: () => void;
}

function Dock({
  onToggleTimer,
  onToggleTasks,
  onToggleNotes,
  onToggleMusic,
  onToggleSettings
}: DockProps) {
  const [timerToggle, setTimerToggle] = useState<boolean>(false);
  const [tasksToggle, setTasksToggle] = useState<boolean>(false);
  const [notesToggle, setNotesToggle] = useState<boolean>(false);

  return (
    <div className="select-none absolute bottom-[50px] left-1/2 transform -translate-x-1/2 border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,0.09)] backdrop-blur-[3.5px] rounded-[30px] w-fit p-5">
      <div className="buttonsContainer flex flex-row items-center gap-[16px]">
        <div
          onClick={() => {
            setTasksToggle((prev) => !prev);
            onToggleTasks(!tasksToggle);
          }}
          className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2.0999999046325684px] py-[16px] px-[24px] rounded-2xl"
        >
          <Image
            src="/task-icon.svg"
            alt="task icon"
            className={`w-[32px] h-[32px] transition-all ${
              tasksToggle ? "opacity-100" : "opacity-80"
            }`}
            width={32}
            height={32}
          />
        </div>

        <div
          onClick={() => {
            setNotesToggle((prev) => !prev);
            onToggleNotes(!notesToggle);
          }}
          className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2.0999999046325684px] py-[16px] px-[24px] rounded-2xl"
        >
          <Image
            src="/note-icon.png"
            alt="background icon"
            className={`w-[32px] h-[32px] transition-all ${
              notesToggle ? "opacity-100" : "opacity-80"
            }`}
            width={32}
            height={32}
          />
        </div>
        <div
          onClick={() => {
            setTimerToggle((prev) => !prev);
            onToggleTimer(!timerToggle);
          }}
          className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2.0999999046325684px] py-[16px] px-[24px] rounded-2xl"
        >
          <Image
            src="/timer-icon.svg"
            alt="timer icon"
            className={`w-[32px] h-[32px] transition-all ${
              timerToggle ? "opacity-100" : "opacity-80"
            }`}
            width={32}
            height={32}
          />
        </div>
        <div
          onClick={onToggleMusic}
          className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2px] py-[16px] px-[24px] rounded-xl"
        >
          <Image
            src="/music-icon.png"
            alt="background icon"
            className="w-[32px] h-[32px] opacity-70"
            width={32}
            height={32}
          />
        </div>
        <div onClick={onToggleSettings} className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2.0999999046325684px] py-[16px] px-[24px] rounded-2xl">
          <Image
            src="/settings-icon.svg"
            alt="settings icon"
            className="w-[32px] h-[32px] opacity-70"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
}

export default Dock;
