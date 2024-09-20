"use client";
import React, { useState, useEffect } from "react";
import { Note, Task, User } from "@/app/types";
import { createSwapy } from "swapy";
import Dock from "../components/Dock";
import TasksCard from "../components/cards/Tasks";
import StopwatchCard from "../components/cards/Stopwatch";
import NotesCard from "../components/cards/Notes";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import addNewTask from "../actions/addNewTask";
import addNewNote from "../actions/addNewNote";
import deleteTask from "../actions/deleteTask";
import deleteNote from "../actions/deleteNote";

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

  const toggleStopwatch = () =>
    toggleCard(showStopwatchCard, setShowStopwatchCard, "clockCardVisible");
  const toggleTasks = () => toggleCard(showTasksCard, setShowTasksCard);
  const toggleNotes = () => toggleCard(showNotesCard, setShowNotesCard);

  const handleAddTask = async (title: string) => {
    console.log(tasks);
    console.log("up");
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
    const index = tasks.findIndex((item) => item.id === taskId);
    if (index !== -1) {
      const newArray = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
      setTasks(newArray);
    }
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error(error);
    }
  };

  // heree
  const handleAddNote = async (content: string) => {
    console.log(tasks);
    console.log("up");
    const tempNote: Note = {
      id: `temp-${Date.now()}`,
      content,
    };

    setNotes((prevNotes) => [...prevNotes, tempNote]);
    try {
      const newNote = await addNewNote(content);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === tempNote.id ? newNote : note))
      );
    } catch (error) {
      console.error("Error adding task:", error);
      setNotes((prevTasks) => prevTasks.filter((note) => note.id !== note.id));
    }
  };
  const handleDeleteNote = async (noteId: string) => {
    const index = notes.findIndex((item) => item.id === noteId);
    if (index !== -1) {
      const newArray = [...notes.slice(0, index), ...notes.slice(index + 1)];
      setNotes(newArray);
    }
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="bg-cozy bg-cover w-full h-screen min-h-screen px-[140px]">
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
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardClient;
