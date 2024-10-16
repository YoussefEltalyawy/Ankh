import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import completeTask from "../actions/completeTask";
import unCompleteTask from "../actions/unCompleteTask";
import updateTask from "../actions/updateTask";
import { X, Check } from "lucide-react";
import { cn } from "@nextui-org/theme";
import Image from "next/image";

type TaskItemProps = {
  title: string;
  id: string;
  completed: boolean;
  onDeleteTask: (title: string) => Promise<void>;
};

function TaskItem({ title, id, completed, onDeleteTask }: TaskItemProps) {
  const [isSelected, setIsSelected] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);

  async function changeCompleteState(taskId: string) {
    if (isSelected === false) {
      setIsSelected(true);
      await completeTask(taskId);
    } else {
      setIsSelected(false);
      await unCompleteTask(taskId);
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateTask = async () => {
    if (editedTitle.trim() === "") return;
    if (editedTitle === title) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateTask(id, editedTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setEditedTitle(title); // Reset to original title on error
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdateTask();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <li key={id} className="flex flex-row justify-between group mb-[10px]">
      {!isEditing ? (
        <>
          <Checkbox
            color="default"
            radius="sm"
            size="md"
            isSelected={isSelected}
            onValueChange={() => changeCompleteState(id)}
            className="text-white"
          >
            <p
              className={cn(
                "text-p transition-colors",
                isSelected ? "text-[#8b8b8b]" : "text-white"
              )}
            >
              {editedTitle}
            </p>
          </Checkbox>

          <span className="flex gap-4">
            <Image
              src="/edit-icon.svg"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer"
              width={24}
              height={24}
              alt="edit-icon"
              onClick={handleEdit}
            />
            <X
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer"
              onClick={() => onDeleteTask(id)}
            />
          </span>
        </>
      ) : (
        <div className="flex w-full justify-between items-center">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-transparent text-white border-b border-white focus:outline-none px-2 py-1 w-full mr-4"
            autoFocus
          />
          <span className="flex gap-4">
            <Check
              className="text-white cursor-pointer"
              onClick={handleUpdateTask}
            />
            <X
              className="text-white cursor-pointer"
              onClick={() => {
                setEditedTitle(title);
                setIsEditing(false);
              }}
            />
          </span>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
