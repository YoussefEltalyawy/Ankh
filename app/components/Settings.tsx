import React, { useState } from "react";
import { cn } from "@heroui/theme";
import Image from "next/image";
import ThemesSection from "./ThemesSection";
import ProfileSection from "./ProfileSection";
import PomodoroSettings from "./PomodoroSettings";
import { SessionUser } from "../types";

function Settings({ isOpen, user }: { isOpen: boolean; user: SessionUser }) {
  const [pomodoroSettings, setPomodoroSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
  });

  const settingsSections = [
    {
      id: "themes",
      icon: "/palette.svg",
      label: "Themes",
      component: ThemesSection,
    },
    {
      id: "profile",
      icon: "/profile-icon.svg",
      label: "Profile",
      component: ProfileSection,
      props: { user },
    },
    {
      id: "pomodoro",
      icon: "/timer-icon.svg",
      label: "Pomodoro",
      component: PomodoroSettings,
      props: {
        settings: pomodoroSettings,
        onSettingsChange: setPomodoroSettings
      },
    },
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderContent = () => {
    if (!activeSection) {
      return (
        <div className="space-y-3 mt-8">
          {settingsSections.map((section) => (
            <div
              key={section.id}
              className="group flex items-center px-5 py-4 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all duration-300"
              onClick={() => setActiveSection(section.id)}
            >
              <div className="bg-white/10 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={section.icon}
                  width={24}
                  height={24}
                  alt={`${section.label} icon`}
                />
              </div>
              <h4 className="text-lg font-medium tracking-wide">{section.label}</h4>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const section = settingsSections.find((s) => s.id === activeSection);
    if (!section) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SectionComponent = section.component as React.ComponentType<any>;
    return (
      <div className="mt-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => setActiveSection(null)}
          className="flex items-center mb-8 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all w-fit group"
        >
          <svg className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <SectionComponent {...(section.props as any || {})} />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-0 bottom-0 w-[85vw] md:w-[400px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-50 text-white overflow-y-auto border-l border-white/10 bg-black/95 backdrop-blur-2xl shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative p-6 md:p-8 min-h-full">
        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11L8 17H5L7 11V7H10V11ZM18 11L16 17H13L15 11V7H18V11Z" fill="#C0A062" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold bg-linear-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text mt-8 mb-2">
          {activeSection
            ? settingsSections.find(s => s.id === activeSection)?.label || "Settings"
            : "Settings"
          }
        </h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default Settings;