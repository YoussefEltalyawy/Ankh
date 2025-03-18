import React, { useState } from "react";
import { cn } from "@nextui-org/theme";
import Image from "next/image";
import ThemesSection from "./ThemesSection";
import ProfileSection from "./ProfileSection";
import { UserExtra } from "../types";

function Settings({ isOpen, user }: { isOpen: boolean; user: UserExtra }) {
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
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderContent = () => {
    if (!activeSection) {
      return (
        <div className="space-y-4 mt-6">
          {settingsSections.map((section) => (
            <div
              key={section.id}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-[#1a1a1a] rounded-lg transition-colors duration-200"
              onClick={() => setActiveSection(section.id)}
            >
              <Image
                src={section.icon}
                width={32}
                height={32}
                alt={`${section.label} icon`}
                className="mr-4"
              />
              <h4 className="text-h4 font-medium">{section.label}</h4>
            </div>
          ))}
        </div>
      );
    }

    const section = settingsSections.find((s) => s.id === activeSection);
    if (!section) return null;

    const SectionComponent = section.component;
    return (
      <div className="mt-6">
        <button
          onClick={() => setActiveSection(null)}
          className="flex items-center mb-6 text-white hover:text-gray-200 transition-colors"
        >
          <span className="mr-2">←</span> Back to settings
        </button>
        <SectionComponent {...(section.props || {})} />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "bg-black h-full absolute right-0 w-[50vw] transition-transform duration-300 ease-in-out z-10 text-white overflow-y-auto",
        isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
      )}
    >
      <h1 className="text-h2 font-bold text-center mt-12">
        {activeSection
          ? settingsSections.find(s => s.id === activeSection)?.label || "Settings"
          : "Settings"
        }
      </h1>
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default Settings;