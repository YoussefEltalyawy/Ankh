import React, { useState } from "react";
import { cn } from "@heroui/theme";
import { ArrowLeft, Palette, User, Timer, ChevronRight, X, BarChart3 } from "lucide-react";
import ThemesSection from "./ThemesSection";
import ProfileSection from "./ProfileSection";
import PomodoroSettings from "./PomodoroSettings";
import Stats from "./Stats";
import { SessionUser, Task } from "../types";

function Settings({ isOpen, user, tasks }: { isOpen: boolean; user: SessionUser; tasks?: Task[] }) {
  const [pomodoroSettings, setPomodoroSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
  });

  const settingsSections = [
    {
      id: "themes",
      icon: Palette,
      label: "Themes",
      description: "Customize your workspace appearance",
      component: ThemesSection,
    },
    {
      id: "stats",
      icon: BarChart3,
      label: "Productivity",
      description: "View your focus metrics and progress",
      component: Stats,
      props: { tasks: tasks || [] },
    },
    {
      id: "pomodoro",
      icon: Timer,
      label: "Pomodoro",
      description: "Configure focus sessions",
      component: PomodoroSettings,
      props: {
        settings: pomodoroSettings,
        onSettingsChange: setPomodoroSettings,
      },
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      description: "Manage your account",
      component: ProfileSection,
      props: { user },
    },
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderContent = () => {
    if (!activeSection) {
      return (
        <div className="space-y-2 mt-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/10 transition-all duration-200 group text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-[#C0A062]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C0A062]/15 transition-colors">
                  <Icon className="w-4 h-4 text-[#C0A062]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white">{section.label}</h4>
                  <p className="text-[11px] text-white/35 mt-0.5">{section.description}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            );
          })}

          {/* Keyboard shortcuts hint */}
          <div className="mt-4 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-[11px] text-white/30 font-medium mb-2">Keyboard Shortcuts</p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { keys: "1 / 2 / 3", desc: "Toggle panels" },
                { keys: "M", desc: "Toggle music" },
                { keys: "⌘ ,", desc: "Settings" },
                { keys: "Esc", desc: "Close" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <kbd className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] text-white/40 font-mono border border-white/5">
                    {s.keys}
                  </kbd>
                  <span className="text-[10px] text-white/25">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const section = settingsSections.find((s) => s.id === activeSection);
    if (!section) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SectionComponent = section.component as React.ComponentType<any>;
    const Icon = section.icon;

    return (
      <div className="mt-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => setActiveSection(null)}
          className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-all group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-medium">Back</span>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-[#C0A062]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#C0A062]" />
          </div>
          <h3 className="text-base font-manrope font-semibold text-white">{section.label}</h3>
        </div>

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <SectionComponent {...(section.props as any || {})} />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-0 bottom-0 w-[85vw] md:w-[380px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-50 text-white overflow-y-auto border-l border-white/5 bg-[rgba(10,10,10,0.95)] backdrop-blur-2xl shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative p-5 md:p-6 min-h-full">
        {/* Close button */}
        {activeSection && (
          <button
            onClick={() => setActiveSection(null)}
            className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-3.5 h-3.5 text-white/40" />
          </button>
        )}

        {/* Header */}
        <div className="mb-1">
          <h1 className="text-xl font-bold font-manrope bg-linear-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text">
            {activeSection
              ? settingsSections.find((s) => s.id === activeSection)?.label || "Settings"
              : "Settings"}
          </h1>
          {!activeSection && (
            <p className="text-[11px] text-white/30 mt-1">Customize your Ankh experience</p>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default Settings;
