import React from "react";
import TaskItem from "../TaskItem";
import NewTask from "../NewTask";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TasksProps = {
  visible: boolean;
  opacity: number;
  tasks: Task[] | undefined;
};

function TasksCard({ visible, opacity, tasks }: TasksProps) {
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
        <h6 className="font-semibold font-manrope text-h6 text-white mb-[16px]">Tasks</h6>
        {tasks && (
          <ul>
            {tasks.map((task) => (
              <TaskItem
                id={task.id}
                title={task.title}
                key={task.id}
                completed={task.completed}
              />
            ))}
          </ul>
        )}
        <NewTask/>
      </div>
    </div>
  );
}

export default TasksCard;
