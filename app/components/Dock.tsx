import React, { useState } from "react"; // Import React and useState hook
import Image from "next/image"; // Import Image component from Next.js

// Define the type for Dock component props
type DockProps = {
  onToggleTimer: (toggle: boolean) => void; 
  onToggleTasks: (toggle: boolean) => void; 
  onToggleNotes: (toggle: boolean) => void; 
  onToggleMusic: () => void; 
  onToggleSettings: () => void; 
}

// Define the type for each button in the dock
type DockButton = {
  id: string; 
  icon: string; 
  alt: string; 
  onClick: () => void; 
  state?: boolean; 
}

const Dock: React.FC<DockProps> = ({
  onToggleTimer,
  onToggleTasks,
  onToggleNotes,
  onToggleMusic,
  onToggleSettings,
}) => {
  // State for toggled buttons
  const [timerToggle, setTimerToggle] = useState(false);
  const [tasksToggle, setTasksToggle] = useState(false);
  const [notesToggle, setNotesToggle] = useState(false);

  // Define buttons for the dock
  const buttons: DockButton[] = [
    {
      id: "tasks",
      icon: "/task-icon.svg",
      alt: "task icon",
      state: tasksToggle,
      onClick: () => {
        setTasksToggle((prev) => !prev);
        onToggleTasks(!tasksToggle);
      },
    },
    {
      id: "notes",
      icon: "/note-icon.png",
      alt: "note icon",
      state: notesToggle,
      onClick: () => {
        setNotesToggle((prev) => !prev);
        onToggleNotes(!notesToggle);
      },
    },
    {
      id: "timer",
      icon: "/timer-icon.svg",
      alt: "timer icon",
      state: timerToggle,
      onClick: () => {
        setTimerToggle((prev) => !prev);
        onToggleTimer(!timerToggle);
      },
    },
    {
      id: "music",
      icon: "/music-icon.png",
      alt: "music icon",
      onClick: onToggleMusic,
    },
    {
      id: "settings",
      icon: "/settings-icon.svg",
      alt: "settings icon",
      onClick: onToggleSettings,
    },
  ];

  // CSS classes for button styling
  const buttonClasses = "buttonContainer border border-[rgba(255,255,255,0.29)] bg-[rgba(255, 255, 255, 0.08)] backdrop-blur-[2px] py-[16px] px-[24px] rounded-2xl";

  return (
    // Main dock container
    <div className="select-none absolute bottom-[50px] left-1/2 transform -translate-x-1/2 border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,0.09)] backdrop-blur-[3.5px] rounded-[30px] w-fit p-5">
      <div className="buttonsContainer flex flex-row items-center gap-[16px]">
        {buttons.map((button) => (
          <div
            key={button.id} // Unique key for each button
            onClick={button.onClick} // Click handler
            className={buttonClasses} // Apply styling
          >
            <Image
              src={button.icon} // Set the icon source
              alt={button.alt} // Set the alt text
              className={`w-[32px] h-[32px] transition-all ${
                button.state !== undefined
                  ? button.state
                    ? "opacity-100" // Full opacity if toggled on
                    : "opacity-80" // Reduced opacity if toggled off
                  : "opacity-70" // Default opacity if state is not defined
              }`}
              width={32} // Image width
              height={32} // Image height
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock; // Export the Dock component
