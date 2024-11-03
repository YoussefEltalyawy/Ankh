import React, { useState } from "react";
import { cn } from "@nextui-org/theme";
import Image from "next/image";
import ThemesSection from "./ThemesSection";
import ProfileSection from "./ProfileSection";
import { UserExtra } from "../types";

function Settings({ isOpen, user }: { isOpen: boolean; user: UserExtra }) {
  const settingsSections = [
    {
      icon: "/palette.svg",
      label: "Themes",
      content: <ThemesSection />,
    },
    {
      icon: "/profile-icon.svg",
      label: "Profile",
      content: <ProfileSection user={user} />,
    },
  ];
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "bg-black h-full absolute right-0 w-[50vw] transition-transform duration-300 ease-in-out z-10 text-white overflow-y-auto",
        isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
      )}
    >
      {/* Change the title based on selectedSection */}
      <h1 className="text-h2 font-bold text-center mt-12">
        {selectedSection === null ? "Settings" : selectedSection}
      </h1>

      <div className="p-6">
        {selectedSection === null ? (
          settingsSections.map((section, index) => (
            <div
              key={index}
              className="flex items-center mb-4 cursor-pointer hover:bg-[#1a1a1a] p-2 rounded-large"
              onClick={() => setSelectedSection(section.label)}
            >
              <Image
                src={section.icon}
                width={32}
                height={32}
                alt="icon"
                className="mr-2"
              />
              <h4 className="text-h4 font-bold">{section.label}</h4>
            </div>
          ))
        ) : (
          <div>
            <button
              onClick={() => setSelectedSection(null)}
              className="mb-4 text-white hover:text-gray-200"
            >
              ← Back to all settings
            </button>
            <p>
              {
                settingsSections.find((s) => s.label === selectedSection)
                  ?.content
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
