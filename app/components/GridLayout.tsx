import React, { useState, useEffect, useCallback } from "react";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { Note, Task } from "@/app/types";
import TasksCard from "../components/cards/Tasks";
import NotesCard from "../components/cards/Notes";
import StopwatchCard from "../components/cards/Stopwatch";

const ResponsiveGridLayout = WidthProvider(Responsive);

export type CardState = {
  show: boolean;
  opacity: number;
};

export type CardVisibility = {
  showStopwatchCard: CardState;
  showTasksCard: CardState;
  showNotesCard: CardState;
};

export type GridLayoutProps = {
  tasks: Task[];
  notes: Note[];
  cardVisibility: CardVisibility;
  isMobile: boolean;
  onAddTask: (title: string) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  onAddNote: (content: string) => Promise<void>;
  onDeleteNote: (noteId: string) => Promise<void>;
  onReorderTasks?: (taskIds: string[]) => Promise<void>;
};

const defaultLayout: Layouts = {
  lg: [
    { i: "tasks", x: 0, y: 0, w: 4, h: 6, minW: 3, minH: 3 },
    { i: "notes", x: 4, y: 0, w: 4, h: 6, minW: 3, minH: 3 },
    { i: "stopwatch", x: 8, y: 0, w: 4, h: 6, minW: 3, minH: 4 },
  ],
  md: [
    { i: "tasks", x: 0, y: 0, w: 6, h: 6, minW: 3, minH: 3 },
    { i: "notes", x: 6, y: 0, w: 6, h: 6, minW: 3, minH: 3 },
    { i: "stopwatch", x: 0, y: 6, w: 12, h: 5, minW: 4, minH: 4 },
  ],
  sm: [
    { i: "tasks", x: 0, y: 0, w: 6, h: 6, minW: 6, minH: 3 },
    { i: "notes", x: 0, y: 6, w: 6, h: 6, minW: 6, minH: 3 },
    { i: "stopwatch", x: 0, y: 12, w: 6, h: 5, minW: 6, minH: 4 },
  ],
  xs: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 6, minW: 1, minH: 3 },
    { i: "notes", x: 0, y: 6, w: 1, h: 6, minW: 1, minH: 3 },
    { i: "stopwatch", x: 0, y: 12, w: 1, h: 5, minW: 1, minH: 4 },
  ],
  xxs: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 6, minW: 1, minH: 3 },
    { i: "notes", x: 0, y: 6, w: 1, h: 6, minW: 1, minH: 3 },
    { i: "stopwatch", x: 0, y: 12, w: 1, h: 5, minW: 1, minH: 4 },
  ],
};

const GridLayout: React.FC<GridLayoutProps> = ({
  tasks,
  notes,
  cardVisibility,
  isMobile,
  onAddTask,
  onDeleteTask,
  onAddNote,
  onDeleteNote,
  onReorderTasks,
}) => {
  const { showStopwatchCard, showTasksCard, showNotesCard } = cardVisibility;
  const [containerHeight, setContainerHeight] = useState<number>(600);
  const [layouts, setLayouts] = useState<Layouts>(defaultLayout);

  const rowHeight = 60;
  const marginY = 16;
  const rowStep = rowHeight + marginY; // 76px

  // Calculate maxRows that fit inside the dashboard viewport
  const maxRows = Math.max(4, Math.floor((containerHeight + marginY) / rowStep));

  // Helper to ensure all cards exist with valid dimensions in layout
  const sanitizeLayouts = useCallback((inputLayouts: Layouts, maxAllowedRows: number): Layouts => {
    const keys = ["tasks", "notes", "stopwatch"];
    const sanitized: Layouts = {};

    const breakpoints: (keyof Layouts)[] = ["lg", "md", "sm", "xs", "xxs"];
    for (const bp of breakpoints) {
      const bpItems = inputLayouts[bp] || [];
      const defaultBp = defaultLayout[bp] || [];

      sanitized[bp] = keys.map((key) => {
        const existing = bpItems.find((item) => item.i === key);
        const def = defaultBp.find((d) => d.i === key) || { i: key, x: 0, y: 0, w: 4, h: 6 };
        const itemMinH = key === "stopwatch" ? 4 : 3;

        if (!existing) {
          return { ...def, minH: itemMinH, maxH: maxAllowedRows };
        }

        const validH = !existing.h || existing.h < itemMinH ? def.h : Math.min(existing.h, maxAllowedRows);
        const validW = existing.w < (bp === "xs" || bp === "xxs" ? 1 : 2) ? def.w : existing.w;
        const validY = Math.min(existing.y, Math.max(0, maxAllowedRows - validH));

        return {
          ...existing,
          x: Math.max(0, existing.x),
          y: Math.max(0, validY),
          w: validW,
          h: validH,
          minH: itemMinH,
          minW: bp === "xs" || bp === "xxs" ? 1 : 3,
          maxH: maxAllowedRows,
        };
      });
    }

    return sanitized;
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 80;
      const dockHeight = 90;
      const padding = 32;
      const available = window.innerHeight - headerHeight - dockHeight - padding;
      setContainerHeight(Math.max(350, available));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const savedLayouts = localStorage.getItem("dashboardLayouts");
    if (savedLayouts) {
      try {
        const parsed = JSON.parse(savedLayouts) as Layouts;
        let isCorrupted = false;
        for (const bp of Object.keys(parsed) as (keyof Layouts)[]) {
          const items = parsed[bp];
          if (Array.isArray(items)) {
            for (const item of items) {
              if (!item.h || item.h < 3 || item.w < 1) {
                isCorrupted = true;
                break;
              }
            }
          }
        }
        if (isCorrupted) {
          localStorage.removeItem("dashboardLayouts");
          setLayouts(sanitizeLayouts(defaultLayout, maxRows));
        } else {
          setLayouts(sanitizeLayouts(parsed, maxRows));
        }
      } catch (e) {
        localStorage.removeItem("dashboardLayouts");
        setLayouts(sanitizeLayouts(defaultLayout, maxRows));
      }
    } else {
      setLayouts(sanitizeLayouts(defaultLayout, maxRows));
    }
  }, [maxRows, sanitizeLayouts]);

  // Layout change handler
  const handleLayoutChange = useCallback((_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts((prevLayouts) => {
      const updated: Layouts = { ...prevLayouts };
      for (const bp of Object.keys(allLayouts) as (keyof Layouts)[]) {
        const activeItems = allLayouts[bp] || [];
        const prevItems = prevLayouts[bp] || [];

        updated[bp] = prevItems.map((prevItem) => {
          const active = activeItems.find((a) => a.i === prevItem.i);
          const itemMinH = prevItem.i === "stopwatch" ? 4 : 3;
          if (active && active.h >= itemMinH && active.w >= 1) {
            const clampedY = Math.min(active.y, Math.max(0, maxRows - active.h));
            return {
              ...active,
              y: clampedY,
              maxH: maxRows,
              minH: itemMinH,
            };
          }
          return {
            ...prevItem,
            maxH: maxRows,
            minH: itemMinH,
          };
        });
      }

      localStorage.setItem("dashboardLayouts", JSON.stringify(updated));
      return updated;
    });
  }, [maxRows]);

  return (
    <div className="w-full h-full overflow-hidden" style={{ maxHeight: `${containerHeight}px` }}>
      <ResponsiveGridLayout
        className="w-full"
        style={{ height: `${containerHeight}px`, maxHeight: `${containerHeight}px`, overflow: "hidden" }}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 1, xxs: 1 }}
        rowHeight={rowHeight}
        maxRows={maxRows}
        autoSize={false}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        draggableHandle=".card-handle"
        useCSSTransforms={true}
        preventCollision={true}
        compactType={null}
      >
        <div key="tasks" style={{ display: showTasksCard.show ? "block" : "none" }} className="h-full">
          <TasksCard
            visible={showTasksCard.show}
            opacity={showTasksCard.opacity}
            tasks={tasks}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
            onReorderTasks={onReorderTasks}
          />
        </div>
        <div key="notes" style={{ display: showNotesCard.show ? "block" : "none" }} className="h-full">
          <NotesCard
            visible={showNotesCard.show}
            opacity={showNotesCard.opacity}
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
          />
        </div>
        <div key="stopwatch" style={{ display: showStopwatchCard.show ? "block" : "none" }} className="h-full">
          <StopwatchCard
            visible={showStopwatchCard.show}
            opacity={showStopwatchCard.opacity}
            tasks={tasks.filter((task) => !task.completed)}
          />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;