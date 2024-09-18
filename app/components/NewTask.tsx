
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import addNewTask from "../actions/addNewTask";

function NewTask() {
  const [typing, setTyping] = useState(false);

  return typing ? (
    <form action={addNewTask} className="flex justify-between">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Task"
        className="text-white bg-transparent outline-none"
      />
      <button type="submit" className="text-white">
        <Check className="w-[20px] h-[20px]" />
      </button>
    </form>
  ) : (
    <span
      className="flex gap-[8px] hover:opacity-80 transition-all duration-75 cursor-pointer"
      onClick={() => setTyping(true)}
    >
      <Plus className="text-white" />
      <p className="text-white">Add Task</p>
    </span>
  );
}

export default NewTask;
