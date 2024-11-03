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
      const cooldownPeriod = 500; // .5 second cooldown

      if (now - lastChangeTime > cooldownPeriod) {
        setTheme(newTheme);
        setLastChangeTime(now);
      } else {
        // Optionally, you could show a user-friendly message here
      }
    },
    [setTheme, lastChangeTime]
  );

  return (
    <>
      <h5 className="text-h5 font-bold mb-3">LoFi Egypt.</h5>
      <div className="themes-container grid grid-cols-3 gap-1">
        {themes.map((themeI, index) => (
          <div
            onClick={() => handleThemeChange(themeI.shortName)}
            className="theme-item w-fit text-center cursor-pointer"
            key={index}
          >
            <Image
              src={themeI.background}
              width={200}
              height={100}
              alt={themeI.name}
              className={cn(
                "rounded-large my-3 border-2",
                themeI.shortName === theme ? "border-white" : "border-none"
              )}
            />
            <p>{themeI.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ThemesSection;
