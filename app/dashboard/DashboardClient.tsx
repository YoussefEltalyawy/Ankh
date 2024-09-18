"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { createSwapy } from "swapy";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

import Dock from "../components/Dock";
import TasksCard from "../components/cards/Tasks";
import StopwatchCard from "../components/cards/Stopwatch";
import NotesCard from "../components/cards/Notes";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type CardState = {
  show: boolean;
  opacity: number;
};

type DashboardClientProps = {
  user: object;
  tasks: Task[] | undefined;
};

function DashboardClient({ user, tasks }: DashboardClientProps) {
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

  if (!user) {
    redirect(
      "https://ankh.kinde.com/auth/cx/_:nav&m:register&psid:0191fee9acfdeac21e25441a8206e4d3"
    );
  }

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
              />
            </div>
          </div>
          <div className="secondSlot" data-swapy-slot="second">
            <div data-swapy-item="notes">
              <NotesCard
                visible={showNotesCard.show}
                opacity={showNotesCard.opacity}
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
