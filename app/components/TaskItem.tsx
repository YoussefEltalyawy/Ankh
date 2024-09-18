import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import completeTask from "../actions/completeTask";
import unCompleteTask from "../actions/unCompleteTask";
import { X } from "lucide-react";

function TaskItem({
  title,
  id,
  completed,
}: {
  title: string;
  id: string;
  completed: boolean;
}) {
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
        lineThrough
        className="text-white"
      >
        <p className="text-white text-p">{title}</p>
      </Checkbox>

      {/* The X button is initially hidden and appears with animation on hover */}
      <X className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer" />
    </li>
  );
}

export default TaskItem;
