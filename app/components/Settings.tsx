import React, { useState } from "react";
import { cn } from "@nextui-org/theme";
import Image from "next/image";
import ThemeSelector from "./ThemeSelector";
import ProfileSection from "./ProfileSection";

const settingsSections = [
  {
    icon: "/themes-icon.svg",
    label: "Themes",
    content: <ThemeSelector />,
  },
  {
    icon: "/profile-icon.svg",
    label: "Profile",
    content: <ProfileSection/>
  }
];

function Settings({ isOpen }: { isOpen: boolean }) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "bg-black h-full absolute right-0 w-[50vw] transition-transform duration-300 ease-in-out z-10 text-white overflow-y-auto",
        isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
      )}
    >
      <div className="flex items-center justify-between mt-12 px-6">
        <h1 className="text-h2 font-bold">
          {selectedSection ? selectedSection : "Settings"}
        </h1>
        {selectedSection && (
          <button
            onClick={() => setSelectedSection(null)}
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back
          </button>
        )}
      </div>
      <div className="p-6">
        {selectedSection === null ? (
          settingsSections.map((section, index) => (
            <div
              key={index}
              className="flex items-center mb-4 cursor-pointer hover:bg-[#333] p-2 rounded"
              onClick={() => setSelectedSection(section.label)}
            >
              <span className="mr-3">
                <Image
                  src={section.icon}
                  alt="themes icon"
                  width={32}
                  height={32}
                />
              </span>
              <span className="text-h6">{section.label}</span>
            </div>
          ))
        ) : (
          <div>
            <div>
              {
                settingsSections.find((s) => s.label === selectedSection)
                  ?.content
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
