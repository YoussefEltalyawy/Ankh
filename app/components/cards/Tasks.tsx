import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Task } from "@/app/types"; // Import Task type
import TaskItem from "../TaskItem"; // Import TaskItem component
import NewTask from "../NewTask"; // Import NewTask component

// Props for TasksCard component
type TasksCardProps = {
  visible: boolean; // Controls visibility of the card
  opacity: number; // Opacity level for transitions
  tasks: Task[]; // Array of tasks to display
  onAddTask: (title: string) => Promise<void>; // Callback for adding a new task
  onDeleteTask: (taskId: string) => Promise<void>; // Callback for deleting a task
};

const TasksCard: React.FC<TasksCardProps> = ({
  visible,
  opacity,
  tasks,
  onAddTask,
  onDeleteTask,
}) => {
  // Return null if the card is not visible
  if (!visible) return null;

  // CSS classes for the card with dynamic opacity
  const cardClasses = `
    card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl
    border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] 
    transition-opacity duration-300 ease-in-out
    flex flex-col h-full max-h-[440px] overflow-hidden
    ${opacity === 100 ? "opacity-100" : "opacity-0"}
  `;

  return (
    <div data-swapy-item="first" className={cardClasses}>
      <div className="flex justify-between items-center mb-[10px]">
        <h6 className="font-semibold font-manrope text-h6 text-white">Tasks</h6>
        <MoreHorizontal className="text-white" /> {/* Icon for more options */}
      </div>

      <div className="flex-grow overflow-y-auto mb-[16px]">
        <ul>
          {/* Render each task as a TaskItem */}
          {tasks.map((task) => (
            <TaskItem
              key={task.id} // Unique key for each task
              id={task.id}
              title={task.title}
              completed={task.completed}
              onDeleteTask={onDeleteTask} // Pass delete callback
            />
          ))}
        </ul>
      </div>

      <NewTask onAddTask={onAddTask} /> {/* Component for adding new tasks */}
    </div>
  );
};

export default TasksCard; // Export the TasksCard component
