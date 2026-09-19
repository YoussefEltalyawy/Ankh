import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";

type PomodoroSettingsProps = {
  settings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
  };
  onSettingsChange: (settings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    longBreakInterval: number;
  }) => void;
};

function PomodoroSettings({ settings, onSettingsChange }: PomodoroSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem("pomodoroSettings", JSON.stringify(localSettings));
    }
  };

  const handleReset = () => {
    const defaultSettings = {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
    };
    setLocalSettings(defaultSettings);
    onSettingsChange(defaultSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem("pomodoroSettings", JSON.stringify(defaultSettings));
    }
  };

  return (
    <div className="space-y-4">
      {/* Work duration */}
      <SettingSlider
        label="Focus Duration"
        value={localSettings.workDuration}
        min={5}
        max={60}
        unit="min"
        color="#C0A062"
        onChange={(v) => setLocalSettings((prev) => ({ ...prev, workDuration: v }))}
      />

      {/* Short break */}
      <SettingSlider
        label="Short Break"
        value={localSettings.shortBreakDuration}
        min={1}
        max={15}
        unit="min"
        color="#C0A062"
        onChange={(v) => setLocalSettings((prev) => ({ ...prev, shortBreakDuration: v }))}
      />

      {/* Long break */}
      <SettingSlider
        label="Long Break"
        value={localSettings.longBreakDuration}
        min={5}
        max={30}
        unit="min"
        color="#C0A062"
        onChange={(v) => setLocalSettings((prev) => ({ ...prev, longBreakDuration: v }))}
      />

      {/* Sessions before long break */}
      <SettingSlider
        label="Sessions before Long Break"
        value={localSettings.longBreakInterval}
        min={2}
        max={8}
        unit=""
        color="#C0A062"
        onChange={(v) => setLocalSettings((prev) => ({ ...prev, longBreakInterval: v }))}
      />

      {/* Action buttons */}
      <div className="flex gap-2 pt-2">
        <Button
          onClick={handleSave}
          className="flex-1 bg-[#C0A062] text-white hover:bg-[#C0A062]/80 font-manrope font-medium h-9 text-sm rounded-xl"
        >
          <Save className="w-3.5 h-3.5 mr-2" />
          Save
        </Button>
        <Button
          onClick={handleReset}
          variant="ghost"
          className="text-white/40 hover:text-white hover:bg-white/10 h-9 text-sm rounded-xl"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset
        </Button>
      </div>
    </div>
  );
}

// Reusable slider setting component
function SettingSlider({
  label,
  value,
  min,
  max,
  unit,
  color,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  color: string;
  onChange: (value: number) => void;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs text-white/60 font-medium">{label}</span>
        <span className="text-sm font-bold text-white font-manrope tabular-nums">
          {value}{unit ? ` ${unit}` : ""}
        </span>
      </div>
      <div className="relative h-1.5 bg-white/5 rounded-full">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default PomodoroSettings;
