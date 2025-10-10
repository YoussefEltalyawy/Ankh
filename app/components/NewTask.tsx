import { Check, Plus, Flag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NewTaskProps = {
  onAddTask: (title: string, priority?: 'low' | 'medium' | 'high') => Promise<void>;
};

function NewTask({ onAddTask }: NewTaskProps) {
  const [typing, setTyping] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle("");
      setPriority(undefined);
      setTyping(false);
    }
  };

  const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-white/60';
    }
  };

  return typing ? (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Task"
        className="text-white bg-transparent outline-none flex-1"
        maxLength={36}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Flag className={`w-4 h-4 ${getPriorityColor(priority)}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32 bg-white">
          <DropdownMenuItem onClick={() => setPriority(undefined)}>
            No Priority
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPriority('low')}>
            <span className="text-green-400 mr-2">●</span> Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPriority('medium')}>
            <span className="text-yellow-400 mr-2">●</span> Medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPriority('high')}>
            <span className="text-red-400 mr-2">●</span> High
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
