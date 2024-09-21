import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import completeTask from "../actions/completeTask";
import unCompleteTask from "../actions/unCompleteTask";
import { X } from "lucide-react";
import { cn } from "@nextui-org/theme";

type TaskItemProps = {
  title: string;
  id: string;
  completed: boolean;
  onDeleteTask: (title: string) => Promise<void>;
};

function TaskItem({ title, id, completed, onDeleteTask }: TaskItemProps) {
  // Use React state to track whether the task is selected (completed)
  const [isSelected, setIsSelected] = useState(completed);

  async function changeCompleteState(taskId: string) {
    // Toggle the state when the checkbox is changed
    if (isSelected === false) {
      setIsSelected(true);
      await completeTask(taskId);
    } else {
      setIsSelected(false);
      await unCompleteTask(taskId);
    }
  }

  return (
    <li key={id} className="flex flex-row justify-between group mb-[10px]">
      <Checkbox
        color="default"
        radius="sm"
        size="md"
        isSelected={isSelected} // Bind isSelected to the state
        onValueChange={() => changeCompleteState(id)}
        className="text-white"
      >
        <p
          className={cn(
            "text-p transition-colors",
            isSelected ? "text-[#8b8b8b]" : "text-white"
          )}
        >
          {title}
        </p>
      </Checkbox>

      {/* The X button is initially hidden and appears with animation on hover */}
      <X
        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer"
        onClick={() => onDeleteTask(id)}
      />
    </li>
  );
}

export default TaskItem;
