import Image from "next/image";
import themes from "../themes";
import { useTheme } from "next-themes";
import { cn } from "@nextui-org/theme";
import React, { useState } from "react";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [lastThemeChange, setLastThemeChange] = useState<number | null>(null);
  const cooldownPeriod = 550; // 5 seconds cooldown

  const handleThemeChange = (themeName: string) => {
    const now = Date.now();
    if (lastThemeChange && now - lastThemeChange < cooldownPeriod) {
      // add specail thing to happen if user wanted to change themes fast, nothing will happen for now.
      return;
    }
    setTheme(themeName);
    setLastThemeChange(now);
  };

  return (
    <>
      <h5 className="text-h5 font-bold mb-3">LoFi Egypt.</h5>
      <div className="themes-container grid grid-cols-3 gap-1">
        {themes.map((themeI, index) => (
          <div
            onClick={() => handleThemeChange(themeI.shortName)}
            className="theme-item w-fit text-center"
            key={index}
          >
            <Image
              src={themeI.bg}
              width={250}
              height={150}
              alt={themeI.shortName}
              className={cn(
                "rounded-large my-3 border-2 transition-colors",
                themeI.shortName === theme ? "border-white" : "border-none"
              )}
            />
            <p className="text-p">{themeI.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ThemeSelector;