import React, { useState } from "react";
import { X, Check, Pencil, GripVertical } from "lucide-react";
import { clsx } from "clsx";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import completeTask from "../actions/completeTask";
import unCompleteTask from "../actions/unCompleteTask";
import updateTask from "../actions/updateTask";

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  onDeleteTask: (taskId: string) => Promise<void>;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  onDragOver?: (e: React.DragEvent, id: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, id: string) => void;
  isDragging?: boolean;
  dropIndicator?: "top" | "bottom" | null;
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  priority,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragging,
  dropIndicator,
}) => {
  const [isSelected, setIsSelected] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleCompleteStateChange = async () => {
    const newState = !isSelected;
    setIsSelected(newState);
    try {
      await (newState ? completeTask(id) : unCompleteTask(id));
      if (newState && typeof window !== "undefined") {
        const today = new Date().toISOString().split("T")[0];
        const log: Record<string, number> = JSON.parse(
          localStorage.getItem("taskCompletionLog") || "{}"
        );
        log[today] = (log[today] || 0) + 1;
        localStorage.setItem("taskCompletionLog", JSON.stringify(log));
      }
    } catch (error) {
      console.error("Error updating task state:", error);
      setIsSelected(!newState);
    }
  };

  const handleUpdateTask = async () => {
    if (editedTitle.trim() === "" || editedTitle === title) {
      setIsEditing(false);
      return;
    }
    try {
      await updateTask(id, editedTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setEditedTitle(title);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleUpdateTask();
    else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  // Edit mode
  if (isEditing) {
    return (
      <li className="flex w-full justify-between items-center mb-[10px] group">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-transparent text-white border-b border-white/40 focus:border-white/80 focus:outline-none px-2 py-1 w-full mr-4 text-sm"
          autoFocus
        />
        <span className="flex gap-3">
          <Check
            className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors"
            onClick={handleUpdateTask}
          />
          <X
            className="w-4 h-4 text-white/60 hover:text-white cursor-pointer transition-colors"
            onClick={() => {
              setEditedTitle(title);
              setIsEditing(false);
            }}
          />
        </span>
      </li>
    );
  }

  const getPriorityInfo = (p?: "low" | "medium" | "high") => {
    switch (p) {
      case "high":
        return { color: "text-red-400", bgColor: "bg-red-400/20", label: "High" };
      case "medium":
        return { color: "text-yellow-400", bgColor: "bg-yellow-400/20", label: "Medium" };
      case "low":
        return { color: "text-green-400", bgColor: "bg-green-400/20", label: "Low" };
      default:
        return null;
    }
  };

  const priorityInfo = getPriorityInfo(priority);

  return (
    <li
      id={`task-row-${id}`}
      data-task-row={id}
      className={clsx(
        "relative flex flex-row justify-between group mb-[10px] rounded-lg py-1 transition-all duration-200",
        isDragging && "opacity-40 scale-[0.98]"
      )}
      draggable
      onDragStart={(e) => onDragStart?.(e, id)}
      onDragOver={(e) => onDragOver?.(e, id)}
      onDragEnd={onDragEnd}
      onDrop={(e) => onDrop?.(e, id)}
    >
      {/* Drop indicator line */}
      {dropIndicator === "top" && (
        <div className="absolute -top-[5px] left-0 right-0 h-[2px] bg-[#C0A062] rounded-full shadow-[0_0_6px_rgba(192,160,98,0.5)]" />
      )}
      {dropIndicator === "bottom" && (
        <div className="absolute -bottom-[5px] left-0 right-0 h-[2px] bg-[#C0A062] rounded-full shadow-[0_0_6px_rgba(192,160,98,0.5)]" />
      )}

      <div className="flex items-center space-x-2 flex-1 min-w-0">
        {/* Grip handle — drag handle */}
        <div
          className="-ml-3 opacity-0 group-hover:opacity-60 transition-opacity cursor-grab active:cursor-grabbing shrink-0"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3.5 h-3.5 text-white/40" />
        </div>

        <Checkbox
          id={`task-${id}`}
          checked={isSelected}
          onCheckedChange={handleCompleteStateChange}
          className="h-5 w-5 rounded-sm border-none shrink-0"
        />
        <label
          htmlFor={`task-${id}`}
          className={clsx(
            "text-sm font-medium cursor-pointer transition-colors flex-1 min-w-0 truncate",
            isSelected ? "text-[#ffffffae] line-through" : "text-white"
          )}
        >
          {editedTitle}
        </label>
        {priorityInfo && (
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0",
              priorityInfo.bgColor,
              priorityInfo.color
            )}
          >
            {priorityInfo.label}
          </span>
        )}
      </div>

      <span className="flex gap-3 shrink-0">
        <Pencil
          className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out cursor-pointer hover:text-white"
          onClick={() => setIsEditing(true)}
        />
        <X
          className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out cursor-pointer hover:text-white"
          onClick={() => onDeleteTask(id)}
        />
      </span>
    </li>
  );
};

export default TaskItem;
