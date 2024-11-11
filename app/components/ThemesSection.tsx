import React, { useState, useCallback } from "react";
import Image from "next/image";
import { themes } from "../theme-config";
import { useTheme } from "next-themes";
import { cn } from "@nextui-org/theme";

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
    <>
      <h5 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
        LoFi Egypt.
      </h5>
      <div className="themes-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {themes.map((themeI, index) => (
          <div
            onClick={() => handleThemeChange(themeI.shortName)}
            className="theme-item w-full text-center cursor-pointer"
            key={index}
          >
            <Image
              src={themeI.background}
              width={200}
              height={100}
              alt={themeI.name}
              className={cn(
                "rounded-lg sm:rounded-xl md:rounded-2xl w-full h-auto my-2 sm:my-3 border-2",
                themeI.shortName === theme ? "border-white" : "border-none"
              )}
            />
            <p className="text-sm sm:text-base md:text-lg">{themeI.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ThemesSection;
