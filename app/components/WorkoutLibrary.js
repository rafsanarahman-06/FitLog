"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "../lib/api";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
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

  if (loading) {
    return (
      <section id="library" className="library">
        <div className="loading-box">
          <span className="spinner"></span>
          <p>Loading workouts...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="library" className="library">
      <div className="library-header">
        <div>
          <h2>THE LIBRARY</h2>
          <p className="library-subtitle">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="sort-wrapper">
          <label htmlFor="home-sort">SORT BY</label>

          <select
            id="home-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="workout-grid">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}