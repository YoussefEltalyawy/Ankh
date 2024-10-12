"use client";

import React, { useState, useEffect } from "react";
import { Note, Task, User } from "@/app/types";
import { createSwapy } from "swapy";
import { useTheme } from "next-themes";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

// Component imports
import Dock from "../components/Dock";
import TasksCard from "../components/cards/Tasks";
import StopwatchCard from "../components/cards/Stopwatch";
import NotesCard from "../components/cards/Notes";
import Music from "../components/cards/Music";
// import Header from "../components/Header";
import Settings from "../components/Settings";

// Action imports
import addNewTask from "../actions/addNewTask";
import addNewNote from "../actions/addNewNote";
import deleteTask from "../actions/deleteTask";
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

function DashboardClient({
  user,
  initialTasks,
  initalNotes,
}: DashboardClientProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // State management
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notes, setNotes] = useState<Note[]>(initalNotes);
  const [showStopwatchCard, setShowStopwatchCard] = useState<CardState>({
    show: false,
    opacity: 0,
  });
  const [showTasksCard, setShowTasksCard] = useState<CardState>({
    show: false,
    opacity: 0,
  });
  const [showNotesCard, setShowNotesCard] = useState<CardState>({
    show: false,
    opacity: 0,
  });
  const [showMusicBar, setShowMusicBar] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup Swapy for card DnD
  useEffect(() => {
    if (
      user &&
      (showStopwatchCard.show || showTasksCard.show || showNotesCard.show)
    ) {
      const cardsContainer = document.querySelector(".cardsContainer");
      if (cardsContainer) {
        const swapy = createSwapy(cardsContainer, { animation: "dynamic" });
        swapy.enable(true);
        swapy.onSwap((event) => {
          console.log(event.data.object, event.data.array, event.data.map);
        });
        return () => {
          swapy.destroy();
        };
      } else {
        console.error("cardsContainer element not found");
      }
    }
  }, [showNotesCard.show, showStopwatchCard.show, showTasksCard.show, user]);

  // Toggle card visibility
  const toggleCard = (
    currentState: CardState,
    setStateFunction: React.Dispatch<React.SetStateAction<CardState>>,
    localStorageKey?: string
  ) => {
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

  // Card toggle handlers
  const toggleStopwatch = () =>
    toggleCard(showStopwatchCard, setShowStopwatchCard, "clockCardVisible");
  const toggleTasks = () => toggleCard(showTasksCard, setShowTasksCard);
  const toggleNotes = () => toggleCard(showNotesCard, setShowNotesCard);

  const toggleMusicBar = () => setShowMusicBar((prevState) => !prevState);
  const toggleSettings = () => setShowSettings((prevState) => !prevState);

  // Handle music overlay click
  const handleOverlayClick = () => {
    setShowMusicBar(false);
    setShowSettings(false);
  };

  // Task management
  const handleAddTask = async (title: string) => {
    const tempTask: Task = {
      id: `temp-${Date.now()}`,
      title,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, tempTask]);

    try {
      const newTask = await addNewTask(title);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === tempTask.id ? newTask : task))
      );
    } catch (error) {
      console.error("Error adding task:", error);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== tempTask.id)
      );
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Note management
  const handleAddNote = async (content: string) => {
    const tempNote: Note = { id: `temp-${Date.now()}`, content };
    setNotes((prevNotes) => [...prevNotes, tempNote]);

    try {
      const newNote = await addNewNote(content);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === tempNote.id ? newNote : note))
      );
    } catch (error) {
      console.error("Error adding note:", error);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== tempNote.id)
      );
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Render a loader or placeholder while waiting for client-side hydration
  if (!mounted) {
    return <div className="h-screen w-full bg-gray-100" />; // Placeholder
  }

  return (
    <div>
      <section
        className="dashboardContainer bg-cover bg-center w-full h-screen min-h-screen px-[140px] transition-all duration-500 ease-in-out"
        data-theme={theme || "default"}
      >
        <Music isOpen={showMusicBar} />
        {showMusicBar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[5]"
            onClick={handleOverlayClick}
          />
        )}
        <Settings isOpen={showSettings} />
        {showSettings && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[5]"
            onClick={handleOverlayClick}
          />
        )}
        <div className="pt-[80px] pb-[30px] flex justify-between items-center">
          <h1 className="font-manrope text-h2 text-white font-bold">Ankh</h1>

          <LogoutLink>
            <button className="bg-white opacity-95 font-manrope text-h6 font-bold p-2 rounded-xl px-4">
              Log Out
            </button>
          </LogoutLink>
        </div>
        <Dock
          onToggleTimer={toggleStopwatch}
          onToggleTasks={toggleTasks}
          onToggleNotes={toggleNotes}
          onToggleMusic={toggleMusicBar}
          onToggleSettings={toggleSettings}
        />
        <div className="cardsContainer grid grid-cols-3 gap-[32px]">
          <div className="firstSlot" data-swapy-slot="first">
            <div data-swapy-item="tasks">
              <TasksCard
                visible={showTasksCard.show}
                opacity={showTasksCard.opacity}
                tasks={tasks}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
          <div className="secondSlot" data-swapy-slot="second">
            <div data-swapy-item="notes">
              <NotesCard
                visible={showNotesCard.show}
                opacity={showNotesCard.opacity}
                notes={notes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
              />
            </div>
          </div>
          <div className="thirdSlot" data-swapy-slot="third">
            <div data-swapy-item="stopwatch">
              <StopwatchCard
                visible={showStopwatchCard.show}
                opacity={showStopwatchCard.opacity}
                tasks={tasks}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardClient;
