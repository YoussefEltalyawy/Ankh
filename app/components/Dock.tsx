import Image from "next/image";
import { useState } from "react";

interface DockProps {
  onToggleTimer: (toggle: boolean) => void;
  onToggleTasks: (toggle: boolean) => void;
  onToggleNotes: (toggle: boolean) => void;
  onToggleMusic: () => void;
  onToggleSettings: () => void;
}

const Dock = ({
  onToggleTimer,
  onToggleTasks,
  onToggleNotes,
  onToggleMusic,
  onToggleSettings,
}: DockProps) => {
  const [toggles, setToggles] = useState({
    timer: false,
    tasks: false,
    notes: false,
  });

  const handleToggle = (key: "timer" | "tasks" | "notes", callback: (toggle: boolean) => void) => {
    setToggles((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      callback(newState[key]);
      return newState;
    });
  };

  const buttonClasses =
    "buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2px] rounded-2xl cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.15)] p-2 sm:py-4 sm:px-6 md:py-4 md:px-6";
  const imageClasses = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all";

  const icons = [
    { key: "tasks", src: "/task-icon2.svg", alt: "task icon", callback: onToggleTasks },
    { key: "notes", src: "/note-icon.png", alt: "note icon", callback: onToggleNotes },
    { key: "timer", src: "/timer-icon.svg", alt: "timer icon", callback: onToggleTimer },
  ];

  return (
    <div className="flex justify-center items-center h-full pb-5">
      <div className="border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,0.09)] backdrop-blur-[3.5px] rounded-2xl sm:rounded-[30px] w-fit p-2 sm:p-3 md:p-4">
        <div className="buttonsContainer flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
          {icons.map(({ key, src, alt, callback }) => (
            <div
              key={key}
              onClick={() => handleToggle(key as "timer" | "tasks" | "notes", callback)}
              className={buttonClasses}
            >
              <Image
                src={src}
                alt={alt}
                className={imageClasses}
                style={{ filter: toggles[key as keyof typeof toggles] ? "invert(50%) sepia(100%) saturate(240%) hue-rotate(10deg) brightness(1.2)" : "" }}
                width={32}
                height={32}
              />
            </div>
          ))}
  
          <div onClick={onToggleMusic} className={buttonClasses}>
            <Image
              src="/music-icon.png"
              alt="music icon"
              className={imageClasses}
              width={32}
              height={32}
            />
          </div>
  
          <div onClick={onToggleSettings} className={buttonClasses}>
            <Image
              src="/settings-icon.svg"
              alt="settings icon"
              className={imageClasses}
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dock;
