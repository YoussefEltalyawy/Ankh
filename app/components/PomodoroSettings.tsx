import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    // Save to localStorage
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="workDuration" className="text-white text-sm font-medium">
            Work Duration (minutes)
          </Label>
          <Input
            id="workDuration"
            type="number"
            min="1"
            max="60"
            value={localSettings.workDuration}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              workDuration: parseInt(e.target.value) || 25
            }))}
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        <div>
          <Label htmlFor="shortBreakDuration" className="text-white text-sm font-medium">
            Short Break Duration (minutes)
          </Label>
          <Input
            id="shortBreakDuration"
            type="number"
            min="1"
            max="30"
            value={localSettings.shortBreakDuration}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              shortBreakDuration: parseInt(e.target.value) || 5
            }))}
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        <div>
          <Label htmlFor="longBreakDuration" className="text-white text-sm font-medium">
            Long Break Duration (minutes)
          </Label>
          <Input
            id="longBreakDuration"
            type="number"
            min="1"
            max="60"
            value={localSettings.longBreakDuration}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              longBreakDuration: parseInt(e.target.value) || 15
            }))}
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        <div>
          <Label htmlFor="longBreakInterval" className="text-white text-sm font-medium">
            Long Break Interval (work sessions)
          </Label>
          <Input
            id="longBreakInterval"
            type="number"
            min="2"
            max="10"
            value={localSettings.longBreakInterval}
            onChange={(e) => setLocalSettings(prev => ({
              ...prev,
              longBreakInterval: parseInt(e.target.value) || 4
            }))}
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          className="bg-white text-black hover:bg-white/90 font-medium"
        >
          Save Settings
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
}

export default PomodoroSettings;

