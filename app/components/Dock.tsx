import Image from "next/image";
import { useState, useEffect } from "react";

interface DockProps {
  onToggleTimer: (toggle: boolean) => void;
  onToggleTasks: (toggle: boolean) => void;
  onToggleNotes: (toggle: boolean) => void;
}

function Dock({ onToggleTimer, onToggleTasks, onToggleNotes }: DockProps) {
  const [timerToggle, setTimerToggle] = useState<boolean>(false);
  const [tasksToggle, setTasksToggle] = useState<boolean>(false);
  const [notesToggle, setNotesToggle] = useState<boolean>(false);

  // Only access localStorage when the component is mounted in the browser
  useEffect(() => {
    const storedTimerToggle =
      localStorage.getItem("clockCardVisible") === "true";
    const storedTasksToggle =
      localStorage.getItem("tasksCardVisible") === "true";

    setTimerToggle(storedTimerToggle);
    setTasksToggle(storedTasksToggle);
  }, []);

  // Update localStorage when toggles change
  useEffect(() => {
    localStorage.setItem("clockCardVisible", timerToggle.toString());
  }, [timerToggle]);

  useEffect(() => {
    localStorage.setItem("tasksCardVisible", tasksToggle.toString());
  }, [tasksToggle]);

  return (
    <div className="select-none absolute bottom-[50px] left-1/2 transform -translate-x-1/2 border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,0.09)] backdrop-blur-[3.5px] rounded-[30px] w-fit p-5">
      <div className="buttonsContainer flex flex-row items-center gap-[16px]">
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
        <div className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2px] py-[16px] px-[24px] rounded-xl">
          <Image
            src="/music-icon.png"
            alt="background icon"
            className="w-[32px] h-[32px] opacity-70"
            width={32}
            height={32}
          />
        </div>
        <div className="buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2.0999999046325684px] py-[16px] px-[24px] rounded-2xl">
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
