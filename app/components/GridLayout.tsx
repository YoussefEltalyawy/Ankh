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
  const [isDragging, setIsDragging] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

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

    // Calculate available height for grid
    const updateContainerHeight = () => {
      const headerHeight = 80; // Approximate header height
      const dockHeight = 100; // Approximate dock height
      const padding = 64; // 32px padding top and bottom
      const availableHeight = window.innerHeight - headerHeight - dockHeight - padding;
      setContainerHeight(availableHeight);
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  // Prevent page scrolling during drag operations
  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isDragging]);

  const handleLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    localStorage.setItem("dashboardLayouts", JSON.stringify(allLayouts));
  };

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Calculate max rows based on available height
  const maxRows = Math.floor(containerHeight / 156); // 140 rowHeight + 16 margin

  // Prevent resizing beyond container bounds
  const handleResize = useCallback((layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Calculate if the new item would exceed container height
    const itemBottom = (newItem.y + newItem.h) * 156; // 140 rowHeight + 16 margin
    if (itemBottom > containerHeight) {
      // Constrain the height to fit within container
      const maxAllowedHeight = Math.floor((containerHeight - newItem.y * 156) / 156);
      newItem.h = Math.max(1, maxAllowedHeight);
    }
  }, [containerHeight]);

  // Prevent dragging beyond container bounds
  const handleDrag = useCallback((layout: Layout[], oldItem: Layout, newItem: Layout) => {
    // Constrain Y position to prevent vertical overflow
    const itemBottom = (newItem.y + newItem.h) * 156;
    if (itemBottom > containerHeight) {
      const maxAllowedY = Math.floor((containerHeight - newItem.h * 156) / 156);
      newItem.y = Math.max(0, maxAllowedY);
    }
    
    // Ensure item doesn't go above the container
    if (newItem.y < 0) {
      newItem.y = 0;
    }
    
    // Constrain X position to prevent horizontal overflow
    if (newItem.x < 0) {
      newItem.x = 0;
    }
  }, [containerHeight]);

  // Validate and constrain entire layout
  const validateLayout = useCallback((layout: Layout[]) => {
    return layout.map(item => {
      const constrainedItem = { ...item };
      
      // Constrain Y position and height
      const itemBottom = (constrainedItem.y + constrainedItem.h) * 156;
      if (itemBottom > containerHeight) {
        const maxAllowedY = Math.floor((containerHeight - constrainedItem.h * 156) / 156);
        constrainedItem.y = Math.max(0, maxAllowedY);
      }
      
      // Ensure minimum bounds
      constrainedItem.x = Math.max(0, constrainedItem.x);
      constrainedItem.y = Math.max(0, constrainedItem.y);
      
      return constrainedItem;
    });
  }, [containerHeight]);

  return (
    <div className="w-full h-full overflow-hidden">
      <ResponsiveGridLayout
        className="w-full"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : "100%",
          width: "100%",
          overflow: "hidden",
          maxHeight: containerHeight > 0 ? `${containerHeight}px` : "100vh"
        }}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }}
        rowHeight={140}
        maxRows={Math.max(2, maxRows)} // Ensure at least 2 rows, but respect calculated max
        autoSize={false}
        isDraggable={!isMobile}
        isResizable={!isMobile}
        onLayoutChange={handleLayoutChange}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        onResizeStart={handleDragStart}
        onResizeStop={handleDragStop}
        onResize={handleResize}
        onDrag={handleDrag}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        draggableHandle=".card-handle"
        useCSSTransforms={true}
        preventCollision={false}
        compactType="vertical"
        verticalCompact={true}
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