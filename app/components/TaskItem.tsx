import React, { useState } from "react";
import { X, Check } from "lucide-react";
import Image from "next/image";
import { clsx } from 'clsx';

// import { Label } from '@/components/ui/label';
import {
  Checkbox,
} from '@/components/animate-ui/components/radix/checkbox';
import completeTask from "../actions/completeTask";
import unCompleteTask from "../actions/unCompleteTask";
import updateTask from "../actions/updateTask";

// TaskItem component props type definition
type TaskItemProps = {
  id: string; // Task ID
  title: string; // Task title
  completed: boolean; // Task completion state
  priority?: 'low' | 'medium' | 'high'; // Task priority
  onDeleteTask: (taskId: string) => Promise<void>; // Function to delete task
};

// TaskItem component implementation
const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  priority,
  onDeleteTask,
}) => {
  // State to track task's selected (completed) state
  const [isSelected, setIsSelected] = useState(completed);

  // State to track if the task is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the edited task title
  const [editedTitle, setEditedTitle] = useState(title);

  // Handler to toggle the task's completion state
  const handleCompleteStateChange = async () => {
    const newState = !isSelected;
    setIsSelected(newState); // Update UI immediately

    try {
      // Call appropriate function based on new state
      await (newState ? completeTask(id) : unCompleteTask(id));
    } catch (error) {
      console.error("Error updating task state:", error);
      setIsSelected(!newState); // Revert state in case of error
    }
  };

  // Handler to update the task title after editing
  const handleUpdateTask = async () => {
    // Exit editing mode if title is unchanged or empty
    if (editedTitle.trim() === "" || editedTitle === title) {
      setIsEditing(false);
      return;
    }

    try {
      // Update task title and exit editing mode
      await updateTask(id, editedTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setEditedTitle(title); // Revert title on error
    }
  };

  // Handler for keyboard actions during title editing
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdateTask(); // Confirm edit on Enter
    } else if (e.key === "Escape") {
      setEditedTitle(title); // Revert changes on Escape
      setIsEditing(false);
    }
  };

  // Render editable task item if in editing mode
  if (isEditing) {
    return (
      <li className="flex w-full justify-between items-center mb-[10px]">
        <input
          type="text"
          value={editedTitle} // Bind input to editedTitle state
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-transparent text-white border-b border-white focus:outline-none px-2 py-1 w-full mr-4"
          autoFocus
        />
        <span className="flex gap-4">
          {/* Confirm edit button */}
          <Check
            className="text-white cursor-pointer"
            onClick={handleUpdateTask}
          />
          {/* Cancel edit button */}
          <X
            className="text-white cursor-pointer"
            onClick={() => {
              setEditedTitle(title); // Revert changes
              setIsEditing(false); // Exit editing mode
            }}
          />
        </span>
      </li>
    );
  }

  // Get priority color and label
  const getPriorityInfo = (priority?: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-400', bgColor: 'bg-red-400/20', label: 'High' };
      case 'medium':
        return { color: 'text-yellow-400', bgColor: 'bg-yellow-400/20', label: 'Medium' };
      case 'low':
        return { color: 'text-green-400', bgColor: 'bg-green-400/20', label: 'Low' };
      default:
        return null;
    }
  };

  const priorityInfo = getPriorityInfo(priority);

  // Render task item view when not in editing mode
  return (
    <li className="flex flex-row justify-between group mb-[10px]">
      <div className="flex items-center space-x-2 flex-1">
        <Checkbox
          id={`task-${id}`}
          checked={isSelected}
          onCheckedChange={handleCompleteStateChange}
          className="h-5 w-5 rounded-sm border-none"
        />
        <label
          htmlFor={`task-${id}`}
          className={clsx(
            "text-base font-medium cursor-pointer transition-colors flex-1",
            isSelected ? "text-[#ffffffae] line-through" : "text-white"
          )}
        >
          {editedTitle}
        </label>
        {priorityInfo && (
          <span className={clsx(
            "px-2 py-1 rounded-full text-xs font-medium",
            priorityInfo.bgColor,
            priorityInfo.color
          )}>
            {priorityInfo.label}
          </span>
        )}
      </div>

      <span className="flex gap-4">
        {/* Edit task button */}
        <Image
          src="/edit-icon.svg"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer"
          width={24}
          height={24}
          alt="edit-icon"
          onClick={() => setIsEditing(true)}
        />
        {/* Delete task button */}
        <X
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer"
          onClick={() => onDeleteTask(id)}
        />
      </span>
    </li>
  );
};

export default TaskItem;
