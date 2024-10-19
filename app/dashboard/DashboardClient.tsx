"use client";

import React, { useState, useEffect } from "react";
import { Note, Task, User } from "@/app/types";
import { createSwapy } from "swapy";
import { useTheme } from "next-themes";

// Components
import Dock from "../components/Dock";
import TasksCard from "../components/cards/Tasks";
import StopwatchCard from "../components/cards/Stopwatch";
import NotesCard from "../components/cards/Notes";
import Music from "../components/cards/Music";
import Settings from "../components/Settings";

// Actions
import addNewTask from "../actions/addNewTask";
import deleteTask from "../actions/deleteTask";
import addNewNote from "../actions/addNewNote";
import deleteNote from "../actions/deleteNote";

// Types
type CardState = {
  show: boolean;
  opacity: number;
};

type DashboardClientProps = {
  user: User;
  initialTasks: Task[];
  initalNotes: Note[];
};

// Helper functions
const initializeCardState = (): CardState => ({
  show: false,
  opacity: 0,
});

const toggleCardState = (
  currentState: CardState,
  setStateFunction: React.Dispatch<React.SetStateAction<CardState>>,
  localStorageKey?: string
): void => {
  if (currentState.show) {
    setStateFunction({ ...currentState, opacity: 0 });
    setTimeout(() => setStateFunction({ show: false, opacity: 0 }), 300);
  } else {
    setStateFunction({ show: true, opacity: 0 });
    setTimeout(() => setStateFunction({ show: true, opacity: 100 }), 50);
  }

  if (localStorageKey) {
    localStorage.setItem(localStorageKey, (!currentState.show).toString());
  }
};

const DashboardClient: React.FC<DashboardClientProps> = ({
  user,
  initialTasks,
  initalNotes,
}) => {
  // State management
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notes, setNotes] = useState<Note[]>(initalNotes);

  // Card states
  const [stopwatchCard, setStopwatchCard] = useState<CardState>(
    initializeCardState()
  );
  const [tasksCard, setTasksCard] = useState<CardState>(initializeCardState());
  const [notesCard, setNotesCard] = useState<CardState>(initializeCardState());
  const [showMusicBar, setShowMusicBar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Swapy initialization
  useEffect(() => {
    if (!user || !(stopwatchCard.show || tasksCard.show || notesCard.show)) {
      return;
    }

    const container = document.querySelector(".cardsContainer");
    if (!container) {
      console.error("Cards container not found");
      return;
    }

    const swapy = createSwapy(container, { animation: "dynamic" });
    swapy.enable(true);
    swapy.onSwap((event) => {
      console.log(event.data.object, event.data.array, event.data.map);
    });

    return () => swapy.destroy();
  }, [notesCard.show, stopwatchCard.show, tasksCard.show, user]);

  // Task management
  const handleAddTask = async (title: string) => {
    const tempTask: Task = {
      id: `temp-${Date.now()}`,
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, tempTask]);

    try {
      const newTask = await addNewTask(title);
      setTasks((prev) =>
        prev.map((task) => (task.id === tempTask.id ? newTask : task))
      );
    } catch (error) {
      console.error("Error adding task:", error);
      setTasks((prev) => prev.filter((task) => task.id !== tempTask.id));
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Note management
  const handleAddNote = async (content: string) => {
    const tempNote: Note = { id: `temp-${Date.now()}`, content };
    setNotes((prev) => [...prev, tempNote]);

    try {
      const newNote = await addNewNote(content);
      setNotes((prev) =>
        prev.map((note) => (note.id === tempNote.id ? newNote : note))
      );
    } catch (error) {
      console.error("Error adding note:", error);
      setNotes((prev) => prev.filter((note) => note.id !== tempNote.id));
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Loading state
  if (!mounted) {
    return <div className="h-screen w-full bg-gray-100" />;
  }

  return (
    <section
      className="dashboardContainer bg-cover bg-center w-full h-screen min-h-screen px-[140px] transition-all duration-500 ease-in-out"
      data-theme={theme}
    >
      {/* Music and Settings overlays */}
      <Music isOpen={showMusicBar} />
      <Settings isOpen={showSettings} user={user} />

      {(showMusicBar || showSettings) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[5]"
          onClick={() => {
            setShowMusicBar(false);
            setShowSettings(false);
          }}
        />
      )}

      {/* Header */}
      <div className="pt-[80px] pb-[30px] flex justify-between items-center">
        <h1 className="font-manrope text-h2 text-white font-bold">Ankh</h1>
      </div>

      {/* Dock */}
      <Dock
        onToggleTimer={() => toggleCardState(stopwatchCard, setStopwatchCard)}
        onToggleTasks={() => toggleCardState(tasksCard, setTasksCard)}
        onToggleNotes={() => toggleCardState(notesCard, setNotesCard)}
        onToggleMusic={() => setShowMusicBar((prev) => !prev)}
        onToggleSettings={() => setShowSettings((prev) => !prev)}
      />

      {/* Cards Container */}
      <div className="cardsContainer grid grid-cols-3 gap-[32px]">
        <div className="firstSlot" data-swapy-slot="first">
          <div data-swapy-item="tasks">
            <TasksCard
              visible={tasksCard.show}
              opacity={tasksCard.opacity}
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
        <div className="secondSlot" data-swapy-slot="second">
          <div data-swapy-item="notes">
            <NotesCard
              visible={notesCard.show}
              opacity={notesCard.opacity}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </div>
        <div className="thirdSlot" data-swapy-slot="third">
          <div data-swapy-item="stopwatch">
            <StopwatchCard
              visible={stopwatchCard.show}
              opacity={stopwatchCard.opacity}
              tasks={tasks}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardClient;
