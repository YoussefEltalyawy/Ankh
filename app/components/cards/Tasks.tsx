import React, { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "../TaskItem";
import NewTask from "../NewTask";
import { Task } from "@/app/types";
import { MoreHorizontal, Search, Filter, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TasksProps = {
  visible: boolean;
  opacity: number;
  tasks: Task[];
  onAddTask: (title: string) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onReorderTasks?: (taskIds: string[]) => Promise<void>;
};

function TasksCard({
  visible,
  opacity,
  tasks,
  onAddTask,
  onDeleteTask,
  onReorderTasks,
}: TasksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");
  const [showCompleted, setShowCompleted] = useState(true);

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;
  const onReorderTasksRef = useRef(onReorderTasks);
  onReorderTasksRef.current = onReorderTasks;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
      const matchesCompleted = showCompleted || !task.completed;
      return matchesSearch && matchesPriority && matchesCompleted;
    });
  }, [tasks, searchQuery, filterPriority, showCompleted]);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    setDraggedId(id);

    requestAnimationFrame(() => {
      const el = document.getElementById(`task-row-${id}`);
      if (el) {
        e.dataTransfer.setDragImage(el, 20, 20);
      }
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(id);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    const sourceId = e.dataTransfer.getData("text/plain");
    setDraggedId(null);
    setDragOverId(null);

    if (!sourceId || sourceId === targetId) return;

    const currentTasks = tasksRef.current;
    const reorder = onReorderTasksRef.current;
    if (!reorder) return;

    const currentIds = currentTasks.map((t) => t.id);
    const sourceIndex = currentIds.indexOf(sourceId);
    const targetIndex = currentIds.indexOf(targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const newOrder = [...currentIds];
    newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, sourceId);

    reorder(newOrder);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverId(null);
  }, []);

  // Container-level drag handlers — prevent the "not-allowed" cursor
  const handleContainerDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleContainerDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    setDraggedId(null);
    setDragOverId(null);

    if (!sourceId) return;

    const currentTasks = tasksRef.current;
    const reorder = onReorderTasksRef.current;
    if (!reorder) return;

    // Find closest task from drop position
    const listEl = e.currentTarget;
    const taskRows = listEl.querySelectorAll<HTMLElement>("[data-task-row]");
    let closestId: string | null = null;
    let closestDist = Infinity;

    for (const row of taskRows) {
      const rect = row.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const dist = Math.abs(e.clientY - midY);
      const taskId = row.getAttribute("data-task-row");
      if (taskId && dist < closestDist) {
        closestDist = dist;
        closestId = taskId;
      }
    }

    if (!closestId || closestId === sourceId) return;

    const currentIds = currentTasks.map((t) => t.id);
    const sourceIndex = currentIds.indexOf(sourceId);
    const targetIndex = currentIds.indexOf(closestId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const newOrder = [...currentIds];
    newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, sourceId);

    reorder(newOrder);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
        flex flex-col h-full max-h-full overflow-hidden
      `}
    >
      <div
        className="flex justify-between items-center mb-[10px] card-handle cursor-grab select-none"
        onDragStart={(e) => e.preventDefault()}
      >
        <h6 className="font-semibold font-manrope text-h6 text-white pointer-events-none">
          Tasks
        </h6>
        <div
          className="flex items-center gap-2"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setSearchQuery(searchQuery ? "" : " ")}>
            <Search className="h-4 w-4 text-white" />
            <span className="sr-only">Search tasks</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <Filter className="h-4 w-4 text-white" />
                <span className="sr-only">Filter options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-[#1a1a1a] border-white/10 text-white">
              <DropdownMenuLabel className="text-white/60 text-xs">Filter by Priority</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => setFilterPriority("all")} className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                All Priorities
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority("high")} className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                <span className="text-red-400 mr-2">●</span> High Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority("medium")} className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                <span className="text-yellow-400 mr-2">●</span> Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority("low")} className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                <span className="text-green-400 mr-2">●</span> Low Priority
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => setShowCompleted(!showCompleted)} className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                <CheckSquare className="h-4 w-4 mr-2" />
                {showCompleted ? "Hide" : "Show"} Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4 text-white" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#1a1a1a] border-white/10 text-white">
              <DropdownMenuLabel className="text-white/60 text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                Refresh
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {searchQuery && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none rounded-lg text-sm"
            autoFocus
          />
        </div>
      )}

      <div
        className="grow overflow-y-auto mb-[16px]"
        onDragOver={handleContainerDragOver}
        onDrop={handleContainerDrop}
      >
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <CheckSquare className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {tasks.length === 0
                ? "Create your first task to get started"
                : "Try adjusting your search or filter criteria"}
            </p>
            {tasks.length === 0 && (
              <Button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Enter Task"]') as HTMLInputElement;
                  if (input) input.focus();
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <ul>
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <TaskItem
                    id={task.id}
                    title={task.title}
                    completed={task.completed}
                    priority={task.priority}
                    onDeleteTask={onDeleteTask}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDrop={handleDrop}
                    isDragging={draggedId === task.id}
                    dropIndicator={dragOverId === task.id && draggedId !== task.id ? "top" : null}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
      <NewTask onAddTask={onAddTask} />
    </div>
  );
}

export default TasksCard;
