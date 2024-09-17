"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { createSwapy } from "swapy";
import Dock from "../components/Dock";
import TasksCard from "../components/cards/Tasks";
import StopwatchCard from "../components/cards/Stopwatch";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import NotesCard from "../components/cards/Notes";

function DashboardClient({ user } : {user: object}) {
  const [showStopwatchCard, setShowStopwatchCard] = useState({
    show: false,
    opacity: 0,
  });

  const [showTasksCard, setShowTasksCard] = useState({
    show: false,
    opacity: 0,
  });

  const [showNotesCard, setShowNotesCard] = useState({
    show: false,
    opacity: 0,
  });

  useEffect(() => {
    // Rest of your useEffect logic
    if (
      user &&
      (showStopwatchCard.show || showTasksCard.show || showNotesCard.show)
    ) {
      const cardsContainer = document.querySelector(".cardsContainer");

      if (cardsContainer) {
        const swapy = createSwapy(cardsContainer, {
          animation: "dynamic",
        });
        swapy.enable(true);
        swapy.onSwap((event) => {
          console.log(event.data.object);
          console.log(event.data.array);
          console.log(event.data.map);
        });
      } else {
        console.error("cardsContainer element not found");
      }
    }
  }, [showNotesCard.show, showStopwatchCard.show, showTasksCard.show, user]);

  const toggleStopwatch = () => {
    if (showStopwatchCard.show) {
      setShowStopwatchCard({ ...showStopwatchCard, opacity: 0 });
      setTimeout(() => setShowStopwatchCard({ show: false, opacity: 0 }), 300);
    } else {
      setShowStopwatchCard({ show: true, opacity: 0 });
      setTimeout(() => setShowStopwatchCard({ show: true, opacity: 100 }), 50);
    }
    localStorage.setItem(
      "clockCardVisible",
      (!showStopwatchCard.show).toString()
    );
  };

  const toggleTasks = () => {
    console.log("toggled");
    console.log(showTasksCard);
    if (showTasksCard.show) {
      setShowTasksCard({ ...showTasksCard, opacity: 0 });
      setTimeout(() => setShowTasksCard({ show: false, opacity: 0 }), 300);
    } else {
      setShowTasksCard({ show: true, opacity: 0 });
      setTimeout(() => setShowTasksCard({ show: true, opacity: 100 }), 50);
    }
  };
    const toggleNotes = () => {
      if (showNotesCard.show) {
        setShowNotesCard({ ...showNotesCard, opacity: 0 });
        setTimeout(() => setShowNotesCard({ show: false, opacity: 0 }), 300);
      } else {
        setShowNotesCard({ show: true, opacity: 0 });
        setTimeout(() => setShowNotesCard({ show: true, opacity: 100 }), 50);
      }
    };
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
        <div>
          <Dock
            onToggleTimer={toggleStopwatch}
            onToggleTasks={toggleTasks}
            onToggleNotes={toggleNotes}
          />
        </div>
        <div className="cardsContainer grid grid-cols-3 gap-[32px]">
          <div className="firstSlot" data-swapy-slot="first">
            <div data-swapy-item="tasks">
              <TasksCard
                visible={showTasksCard.show}
                opacity={showTasksCard.opacity}
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
