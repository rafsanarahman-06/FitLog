"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { useFitLog } from "../context/FitLogContext";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.2 3.5c.7 3.3-1.8 4.6-3 6.2-1.2 1.6-1.1 3.2-.1 4.5-.1-2 1.2-3.2 2.4-4.1.2 2.1 2.7 3.2 2.7 5.6 0 1.4-.7 2.7-1.9 3.5 3.4-.6 5.7-3.2 5.7-6.7 0-3.4-2.1-6.4-5.8-9z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const workouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  function handleDone(id) {
    markAsDone(id);
    toast.success("Workout marked as done!");
  }

  function handleRemovePlan(id) {
    removeFromPlan(id);
    toast.success("Workout removed from today's plan.");
  }

  function handleRemoveSaved(id) {
    removeFromSaved(id);
    toast.success("Workout removed from saved.");
  }

  return (
    <>
      <Navbar />

      <main className="plan-page">
        <section className="plan-header">
          <p className="eyebrow">
            {activeTab === "plan" ? "TODAY'S WORKOUT" : "SAVED WORKOUTS"}
          </p>

          <h1>MY PLAN</h1>

          <p className="plan-subtitle">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        <section className="plan-metrics">
          <div>
            <span>EXERCISES</span>
            <strong>{plan.length}</strong>
          </div>

          <div>
            <span>MINUTES</span>
            <strong>{totalMinutes}</strong>
          </div>

          <div>
            <span>CALORIES</span>
            <strong>{totalCalories}</strong>
          </div>
        </section>

        <div className="plan-controls">
          <div className="plan-tabs">
            <button
              className={activeTab === "plan" ? "active" : ""}
              onClick={() => setActiveTab("plan")}
            >
              TODAY'S PLAN
            </button>

            <button
              className={activeTab === "saved" ? "active" : ""}
              onClick={() => setActiveTab("saved")}
            >
              SAVED ({saved.length})
            </button>
          </div>

          <div className="sort-wrapper">
            <label htmlFor="plan-sort">SORT BY</label>

            <select
              id="plan-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {workouts.length === 0 ? (
          <section className="empty-plan">
            <h2>NOTHING HERE YET</h2>

            <p>
              Browse the library and add a lift to get today moving.
            </p>

            <Link href="/" className="hero-button">
              GO TO WORKOUTS →
            </Link>
          </section>
        ) : (
          <section className="plan-list">
            {workouts.map((workout) => (
              <article className="plan-card" key={workout.id}>
                <img src={workout.image} alt={workout.name} />

                <div className="plan-card-content">
                  <div>
                    <div className="category-pills">
                      {workout.muscleGroups?.slice(0, 2).map((group) => (
                        <span key={group} className="category-pill">
                          {group}
                        </span>
                      ))}
                    </div>

                    <h2>{workout.name}</h2>

                    <p className="plan-equipment">
                      {workout.equipment}
                    </p>

                    <div className="plan-card-stats">
                      <span>
                        <ClockIcon />
                        {workout.duration} min
                      </span>

                      <span>
                        <FlameIcon />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span>
                        <StarIcon />
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="plan-card-actions">
                    <Link href={`/workout/${workout.id}`}>
                      VIEW DETAILS
                    </Link>

                    {activeTab === "plan" && (
                      <button onClick={() => handleDone(workout.id)}>
                        ✓ MARK AS DONE
                      </button>
                    )}

                    {activeTab === "plan" && (
                      <button
                        className="remove-button"
                        onClick={() => handleRemovePlan(workout.id)}
                        aria-label={`Remove ${workout.name}`}
                      >
                        ×
                      </button>
                    )}

                    {activeTab === "saved" && (
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveSaved(workout.id)}
                        aria-label={`Remove ${workout.name}`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}