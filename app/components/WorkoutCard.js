import Link from "next/link";

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
      <path d="M9.5 19.5c-1.5-.8-2.5-2.3-2.5-4.1 0-1.4.7-2.8 2-4.1" />
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

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="workout-card">
      <div className="workout-image-wrap">
        <img
          src={workout.image}
          alt={workout.name}
          className="workout-image"
        />
      </div>

      <div className="workout-content">
        <div className="category-pills">
          {workout.muscleGroups?.map((group) => (
            <span key={group} className="category-pill">
              {group}
            </span>
          ))}
        </div>

        <h3>{workout.name}</h3>

        <p className="equipment">{workout.equipment}</p>

        <div className="workout-stats">
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
    </Link>
  );
}