import React, { useState, useMemo } from "react";
import TaskItem from "../TaskItem";
import NewTask from "../NewTask";
import { Task } from "@/app/types";
import { MoreHorizontal, Search, Filter, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TasksProps = {
  visible: boolean;
  opacity: number;
  tasks: Task[];
  onAddTask: (title: string) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
};

function TasksCard({
  visible,
  opacity,
  tasks,
  onAddTask,
  onDeleteTask,
}: TasksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesCompleted = showCompleted || !task.completed;
      return matchesSearch && matchesPriority && matchesCompleted;
    });
  }, [tasks, searchQuery, filterPriority, showCompleted]);

  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
        flex flex-col h-full max-h-full overflow-hidden
      `}
    >
      <div
        className="flex justify-between items-center mb-[10px] card-handle cursor-grab select-none"
        onDragStart={(e) => e.preventDefault()}
      >
        <h6 className="font-semibold font-manrope text-h6 text-white pointer-events-none">Tasks</h6>
        <div
          className="flex items-center gap-2"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={() => setSearchQuery(searchQuery ? "" : " ")}
          >
            <Search className="h-4 w-4 text-white" />
            <span className="sr-only">Search tasks</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <Filter className="h-4 w-4 text-white" />
                <span className="sr-only">Filter options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white">
              <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterPriority('all')}>
                All Priorities
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('high')}>
                High Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('medium')}>
                Medium Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPriority('low')}>
                Low Priority
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowCompleted(!showCompleted)}>
                <CheckSquare className="h-4 w-4 mr-2" />
                {showCompleted ? 'Hide' : 'Show'} Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4 text-white" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Refresh
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Bar - Hidden by default, shown when searchQuery is not empty */}
      {searchQuery && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none rounded-lg"
            autoFocus
          />
        </div>
      )}
      <div className="grow overflow-y-auto mb-[16px]">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <CheckSquare className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {tasks.length === 0
                ? "Create your first task to get started"
                : "Try adjusting your search or filter criteria"
              }
            </p>
            {tasks.length === 0 && (
              <Button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Enter Task"]') as HTMLInputElement;
                  if (input) input.focus();
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <ul>
            {filteredTasks.map((task) => (
              <TaskItem
                id={task.id}
                title={task.title}
                key={task.id}
                completed={task.completed}
                priority={task.priority}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </ul>
        )}
      </div>
      <NewTask onAddTask={onAddTask} />
    </div>
  );
}

export default TasksCard;