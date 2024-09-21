import React from "react";
import TaskItem from "../TaskItem";
import NewTask from "../NewTask";
import { Task } from "@/app/types";
import { MoreHorizontal } from "lucide-react";

type TasksProps = {
  visible: boolean;
  opacity: number;
  tasks: Task[];
  onAddTask: (title: string) => Promise<void>;
  onDeleteTask: (title: string) => Promise<void>;
};

function TasksCard({
  visible,
  opacity,
  tasks,
  onAddTask,
  onDeleteTask,
}: TasksProps) {
  if (!visible) return null;

  return (
    <div
      data-swapy-item="first"
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
        flex flex-col h-full max-h-[440px] overflow-hidden
      `}
    >
      <span className="flex justify-between items-center  mb-[10px]">
        <h6 className="font-semibold font-manrope text-h6 text-white">Tasks</h6>
        <MoreHorizontal className="text-white" />
      </span>
      <div className="flex-grow overflow-y-auto mb-[16px]">
        <ul>
          {tasks.map((task) => (
            <TaskItem
              id={task.id}
              title={task.title}
              key={task.id}
              completed={task.completed}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      </div>
      <NewTask onAddTask={onAddTask} />
    </div>
  );
}

export default TasksCard;
