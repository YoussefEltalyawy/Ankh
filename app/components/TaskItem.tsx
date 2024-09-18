import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import completeTask from "../actions/completeTask";
import unCompleteTask from "../actions/unCompleteTask";

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
    <div>
      <li key={id}>
        <Checkbox
          color="default"
          radius="sm"
          size="md"
          isSelected={isSelected} // Bind isSelected to the state
          onValueChange={() => changeCompleteState(id)}
        >
          <p className="text-white text-p">{title}</p>
        </Checkbox>
      </li>
    </div>
  );
}

export default TaskItem;
