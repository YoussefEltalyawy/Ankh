import { Check, Plus } from "lucide-react";
import { useState } from "react";

type NewTaskProps = {
  onAddTask: (title: string) => Promise<void>;
};

function NewTask({ onAddTask }: NewTaskProps) {
  const [typing, setTyping] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
      setTyping(false);
    }
  };

  return typing ? (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Task"
        className="text-white bg-transparent outline-none"
        maxLength={36}
      />
      <button type="submit" className="text-white">
        <Check className="w-[20px] h-[20px]" />
      </button>
    </form>
  ) : (
    <span
      className="flex gap-[8px] hover:opacity-80 transition-opacity duration-75 cursor-pointer"
      onClick={() => setTyping(true)}
    >
      <Plus className="text-white" />
      <p className="text-white">Add Task</p>
    </span>
  );
}

export default NewTask;
