"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import { getWorkout } from "../../lib/api";
import { useFitLog } from "../../context/FitLogContext";

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

export default function WorkoutDetail({ params }) {
  const { id } = use(params);

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveWorkout } = useFitLog();

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkout(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="detail-page">
          <div className="loading-box">
            <span className="spinner"></span>
            <p>Loading workout...</p>
          </div>
        </main>
      </>
    );
  }

  if (!workout) {
    return (
      <>
        <Navbar />
        <main className="detail-page">
          <p>Workout not found.</p>
        </main>
      </>
    );
  }

  function handleAddToPlan() {
    const added = addToPlan(workout);

    if (added) {
      toast.success("Workout added to today's plan!");
    } else {
      toast.error(
        "This workout is already in your plan or your plan is full."
      );
    }
  }

  function handleSave() {
    const saved = saveWorkout(workout);

    if (saved) {
      toast.success("Workout saved for later!");
    } else {
      toast.error("This workout is already saved.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="detail-page">
        <Link href="/" className="back-link">
          ← BACK TO LIBRARY
        </Link>

        <section className="detail-layout">
          <div className="detail-image">
            <img src={workout.image} alt={workout.name} />
          </div>

          <div className="detail-content">
            <p className="eyebrow">WORKOUT</p>

            <div className="category-pills">
              {workout.muscleGroups?.map((group) => (
                <span key={group} className="category-pill">
                  {group}
                </span>
              ))}
            </div>

            <h1>{workout.name}</h1>

            <p className="detail-description">
              {workout.description}
            </p>

            <div className="detail-specs">
              <div>
                <span>EQUIPMENT</span>
                <strong>{workout.equipment}</strong>
              </div>

              <div>
                <span>DIFFICULTY</span>
                <strong>{workout.difficulty}</strong>
              </div>

              <div>
                <span>SETS</span>
                <strong>{workout.sets}</strong>
              </div>

              <div>
                <span>REPS</span>
                <strong>{workout.reps}</strong>
              </div>

              <div>
                <span>DURATION</span>
                <strong>
                  <ClockIcon />
                  {workout.duration} min
                </strong>
              </div>

              <div>
                <span>CALORIES</span>
                <strong>
                  <FlameIcon />
                  {workout.caloriesBurned} kcal
                </strong>
              </div>

              <div>
                <span>RATING</span>
                <strong>
                  <StarIcon />
                  {workout.rating}
                </strong>
              </div>
            </div>

            <h2 className="instructions-title">HOW TO DO IT</h2>

            <ol className="instructions">
              {workout.instructions?.map((step, index) => (
                <li key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            <div className="detail-actions">
              <button onClick={handleAddToPlan}>
                ADD TO TODAY'S PLAN
              </button>

              <button onClick={handleSave}>
                SAVE FOR LATER
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}