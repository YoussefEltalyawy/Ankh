import React, { useState, useCallback } from "react";
import Image from "next/image";
import { themes } from "../theme-config";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";

function ThemesSection() {
  const { theme, setTheme } = useTheme();
  const [lastChangeTime, setLastChangeTime] = useState(0);

  const handleThemeChange = useCallback(
    (newTheme: string) => {
      const now = Date.now();
      const cooldownPeriod = 500;
      if (now - lastChangeTime > cooldownPeriod) {
        setTheme(newTheme);
        setLastChangeTime(now);
      }
    },
    [setTheme, lastChangeTime]
  );

  return (
    <div className="space-y-3">
      <p className="text-white/30 text-xs">
        Choose a workspace atmosphere
      </p>

      <div className="grid grid-cols-2 gap-2">
        {themes.map((themeItem, index) => {
          const isActive = themeItem.shortName === theme;
          return (
            <button
              key={index}
              onClick={() => handleThemeChange(themeItem.shortName)}
              className={`relative text-left rounded-xl overflow-hidden border-2 transition-all duration-200 group ${
                isActive
                  ? "border-[#C0A062] ring-1 ring-[#C0A062]/30"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <Image
                src={themeItem.background}
                width={200}
                height={100}
                alt={themeItem.name}
                className="w-full h-20 object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C0A062] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className={`text-[11px] font-medium ${isActive ? "text-white" : "text-white/70"}`}>
                  {themeItem.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemesSection;
