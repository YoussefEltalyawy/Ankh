"use client";

import React, { useState, useEffect } from "react";
import { Note, Task, User } from "@/app/types";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Component imports
import Dock from "../components/Dock";
import Music from "../components/Music";
import Header from "../components/Header";
import Settings from "../components/Settings";
import GridLayout, { CardState } from "../components/GridLayout";

// Action imports
import addNewTask from "../actions/addNewTask";
import addNewNote from "../actions/addNewNote";
import deleteTask from "../actions/deleteTask";
import deleteNote from "../actions/deleteNote";
import { useTheme } from "next-themes";

// Types
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
  const { theme } = useTheme();

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Toggle card visibility with mobile handling
  const toggleCard = (
    currentState: CardState,
    setStateFunction: React.Dispatch<React.SetStateAction<CardState>>,
    localStorageKey?: string
  ) => {
    if (isMobile) {
      // On mobile, close all other cards first
      if (!currentState.show) {
        setShowStopwatchCard({ show: false, opacity: 0 });
        setShowTasksCard({ show: false, opacity: 0 });
        setShowNotesCard({ show: false, opacity: 0 });
      }
    }

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

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      {/* Overlays */}
      {showMusicBar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[5]"
          onClick={handleOverlayClick}
        />
      )}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[5]"
          onClick={handleOverlayClick}
        />
      )}

      <div
        className="flex flex-col w-full h-full bg-cover bg-transition"
        data-theme={theme}
      >
        {/* Header - Fixed at top */}
        <Header />

        {/* Grid Layout - Takes all space between header and dock */}
        <div className="flex-grow w-full px-8 overflow-hidden">
          <GridLayout
            tasks={tasks}
            notes={notes}
            cardVisibility={{
              showStopwatchCard,
              showTasksCard,
              showNotesCard
            }}
            isMobile={isMobile}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        {/* Dock - Fixed at bottom */}
        <div className="w-full px-8 z-10">
          <Dock
            onToggleTimer={toggleStopwatch}
            onToggleTasks={toggleTasks}
            onToggleNotes={toggleNotes}
            onToggleMusic={toggleMusicBar}
            onToggleSettings={toggleSettings}
          />
        </div>
      </div>

      {/* Floating components */}
      <Music isOpen={showMusicBar} />
      <Settings isOpen={showSettings} user={user} />
    </div>
  );
}

export default DashboardClient;