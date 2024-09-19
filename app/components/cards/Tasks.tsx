import React from "react";
import TaskItem from "../TaskItem";
import NewTask from "../NewTask";
import { Task } from "@/app/types";

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
        card bg-[rgba(255,255,255,0.09)] px-[32px] h-full py-[24px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="flex flex-col">
        <h6 className="font-semibold font-manrope text-h6 text-white mb-[16px]">
          Tasks
        </h6>
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
        <NewTask onAddTask={onAddTask} />
      </div>
    </div>
  );
}

export default TasksCard;
