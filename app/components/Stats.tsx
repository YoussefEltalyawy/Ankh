"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, Clock, Flame } from "lucide-react";
import { Task } from "@/app/types";

type StatsProps = {
  tasks: Task[];
};

// Safe localStorage helpers (SSR-safe)
function safeGetItem(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) || fallback;
}

function Stats({ tasks }: StatsProps) {
  const [mounted, setMounted] = useState(false);
  const [completedThisWeek, setCompletedThisWeek] = useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load stats from localStorage only after mount
  useEffect(() => {
    if (!mounted) return;

    const completionLog: Record<string, number> = JSON.parse(
      safeGetItem("taskCompletionLog", "{}")
    );

    // Completed this week
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    let weekTotal = 0;
    for (const [dateStr, count] of Object.entries(completionLog)) {
      const date = new Date(dateStr);
      if (date >= weekAgo && date <= now) {
        weekTotal += count as number;
      }
    }
    setCompletedThisWeek(weekTotal);

    // Focus minutes
    const savedSessions = parseInt(safeGetItem("pomodoroSessions", "0"));
    const pomodoroSettings = JSON.parse(
      safeGetItem("pomodoroSettings", '{"workDuration":25}')
    );
    setTotalFocusMinutes(savedSessions * (pomodoroSettings.workDuration || 25));

    // Calculate streak
    let currentStreak = 0;
    const checkDate = new Date();
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (completionLog[dateStr] && completionLog[dateStr] > 0) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    setStreak(currentStreak);
  }, [mounted]);

  // Task metrics
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter((t) => t.priority === "high" && !t.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, highPriority, completionRate };
  }, [tasks]);

  // Weekly activity - only compute after mount
  const weeklyActivity = useMemo(() => {
    if (!mounted) {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({
        day,
        count: 0,
        isToday: false,
      }));
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const completionLog: Record<string, number> = JSON.parse(
      safeGetItem("taskCompletionLog", "{}")
    );
    const result: { day: string; count: number; isToday: boolean }[] = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      result.push({
        day: days[date.getDay()],
        count: completionLog[dateStr] || 0,
        isToday: i === 0,
      });
    }
    return result;
  }, [mounted]);

  const maxActivity = Math.max(...weeklyActivity.map((d) => d.count), 1);

  return (
    <div className="space-y-5">
      {/* Key metrics row */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<CheckCircle2 className="w-4 h-4" />}
          label="Completed"
          value={metrics.completed.toString()}
          sub={`${metrics.completionRate}% rate`}
        />
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          label="Focus Time"
          value={mounted ? `${totalFocusMinutes}m` : "—"}
          sub="total tracked"
        />
        <StatCard
          icon={<Flame className="w-4 h-4" />}
          label="Streak"
          value={mounted ? `${streak}d` : "—"}
          sub="consecutive days"
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="This Week"
          value={mounted ? completedThisWeek.toString() : "—"}
          sub="tasks done"
        />
      </div>

      {/* Weekly activity chart */}
      <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
        <h3 className="text-xs font-medium text-white/50 mb-3 font-manrope">This Week</h3>
        <div className="flex items-end justify-between gap-2 h-20">
          {weeklyActivity.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-full flex items-end justify-center" style={{ height: "48px" }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: mounted
                      ? `${Math.max((day.count / maxActivity) * 100, day.count > 0 ? 15 : 4)}%`
                      : "4%",
                  }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                  className={`w-full max-w-[24px] rounded-t-md ${
                    day.isToday
                      ? "bg-[#C0A062]"
                      : day.count > 0
                      ? "bg-[#C0A062]/40"
                      : "bg-white/5"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  day.isToday ? "text-[#C0A062]" : "text-white/30"
                }`}
              >
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Task breakdown */}
      <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
        <h3 className="text-xs font-medium text-white/50 mb-3 font-manrope">Task Breakdown</h3>
        <div className="space-y-2.5">
          <BreakdownRow
            label="Pending"
            count={metrics.pending}
            total={metrics.total}
            color="rgba(255,255,255,0.2)"
          />
          <BreakdownRow
            label="Completed"
            count={metrics.completed}
            total={metrics.total}
            color="#C0A062"
          />
          {metrics.highPriority > 0 && (
            <BreakdownRow
              label="High Priority"
              count={metrics.highPriority}
              total={metrics.total}
              color="#C0A062"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-white/[0.03] rounded-2xl p-3.5 border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg bg-[#C0A062]/10 flex items-center justify-center text-[#C0A062]">
          {icon}
        </div>
        <span className="text-[10px] font-medium text-white/40 font-manrope">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-white font-manrope">{value}</span>
        <span className="text-[10px] text-white/30">{sub}</span>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-medium text-white/70">{count}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default Stats;
