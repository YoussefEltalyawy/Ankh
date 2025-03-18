import React, { useState, useEffect } from "react";
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
};

const defaultLayout: Layouts = {
  lg: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "notes", x: 1, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "stopwatch", x: 2, y: 0, w: 1, h: 1, minH: 2, maxH: 2 },
  ],
  md: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "notes", x: 1, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "stopwatch", x: 0, y: 1, w: 2, h: 1, minH: 2, maxH: 2 },
  ],
  sm: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "notes", x: 0, y: 1, w: 1, h: 1, maxH: 2 },
    { i: "stopwatch", x: 0, y: 2, w: 1, h: 1, minH: 2, maxH: 2 },
  ],
  xs: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "notes", x: 0, y: 1, w: 1, h: 1, maxH: 2 },
    { i: "stopwatch", x: 0, y: 2, w: 1, h: 1, minH: 2, maxH: 2 },
  ],
  xxs: [
    { i: "tasks", x: 0, y: 0, w: 1, h: 1, maxH: 2 },
    { i: "notes", x: 0, y: 1, w: 1, h: 1, maxH: 2 },
    { i: "stopwatch", x: 0, y: 2, w: 1, h: 1, minH: 2, maxH: 2 },
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
}) => {
  const { showStopwatchCard, showTasksCard, showNotesCard } = cardVisibility;
  const [layouts, setLayouts] = useState<Layouts>(defaultLayout);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    const savedLayouts = localStorage.getItem("dashboardLayouts");
    if (savedLayouts) {
      try {
        const parsedLayouts = JSON.parse(savedLayouts) as Layouts;
        setLayouts(parsedLayouts);
      } catch (e) {
        console.error("Error loading saved layouts", e);
      }
    }

    // Set initial height and update on resize
    const updateHeight = () => {
      setContainerHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    localStorage.setItem("dashboardLayouts", JSON.stringify(allLayouts));
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveGridLayout
        className="w-full h-full"
        style={{
          minHeight: "calc(100% - 40px)", // Adjust this value based on your margins
          width: "100%"
        }}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
        rowHeight={140}
        autoSize={true}
        isDraggable={!isMobile}
        isResizable={!isMobile}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        draggableHandle=".card-handle"
        useCSSTransforms={true}
      >
        {showTasksCard.show && (
          <div key="tasks">
            <TasksCard
              visible={showTasksCard.show}
              opacity={showTasksCard.opacity}
              tasks={tasks}
              onAddTask={onAddTask}
              onDeleteTask={onDeleteTask}
            />
          </div>
        )}
        {showNotesCard.show && (
          <div key="notes">
            <NotesCard
              visible={showNotesCard.show}
              opacity={showNotesCard.opacity}
              notes={notes}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
            />
          </div>
        )}
        {showStopwatchCard.show && (
          <div key="stopwatch">
            <StopwatchCard
              visible={showStopwatchCard.show}
              opacity={showStopwatchCard.opacity}
              tasks={tasks.filter((task) => !task.completed)}
            />
          </div>
        )}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;