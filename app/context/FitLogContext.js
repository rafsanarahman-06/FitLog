"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  function addToPlan(workout) {
    if (plan.length >= 5) {
      return false;
    }

    if (plan.some((item) => item.id === workout.id)) {
      return false;
    }

    setPlan([...plan, workout]);
    return true;
  }

  function saveWorkout(workout) {
    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }

    setSaved([...saved, workout]);
    return true;
  }

  function removeFromPlan(id) {
    setPlan(plan.filter((item) => item.id !== id));
  }

  function markAsDone(id) {
    setPlan(plan.filter((item) => item.id !== id));
  }

  function removeFromSaved(id) {
    setSaved(saved.filter((item) => item.id !== id));
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}