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
  onToggleSettings,
}: DockProps) {
  const [timerToggle, setTimerToggle] = useState<boolean>(false);
  const [tasksToggle, setTasksToggle] = useState<boolean>(false);
  const [notesToggle, setNotesToggle] = useState<boolean>(false);

  const buttonClasses =
    "buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2px] rounded-2xl cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.15)] p-2 sm:py-4 sm:px-6 md:py-4 md:px-6";
  const imageClasses = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all";

  return (
    <div className="select-none fixed bottom-4 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,0.09)] backdrop-blur-[3.5px] rounded-2xl sm:rounded-[30px] w-fit p-2 sm:p-3 md:p-4">
      <div className="buttonsContainer flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
        <div
          onClick={() => {
            setTasksToggle((prev) => !prev);
            onToggleTasks(!tasksToggle);
          }}
          className={buttonClasses}
        >
          <Image
            src="/task-icon2.svg"
            alt="task icon"
            className={`${imageClasses} ${
              tasksToggle ? "opacity-100" : "opacity-70"
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
          className={buttonClasses}
        >
          <Image
            src="/note-icon.png"
            alt="background icon"
            className={`${imageClasses} ${
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
          className={buttonClasses}
        >
          <Image
            src="/timer-icon.svg"
            alt="timer icon"
            className={`${imageClasses} ${
              timerToggle ? "opacity-100" : "opacity-70"
            }`}
            width={32}
            height={32}
          />
        </div>

        <div onClick={onToggleMusic} className={buttonClasses}>
          <Image
            src="/music-icon.png"
            alt="background icon"
            className={`${imageClasses} opacity-70`}
            width={32}
            height={32}
          />
        </div>

        <div onClick={onToggleSettings} className={buttonClasses}>
          <Image
            src="/settings-icon.svg"
            alt="settings icon"
            className={`${imageClasses} opacity-70`}
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
}

export default Dock;
