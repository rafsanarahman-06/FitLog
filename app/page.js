import Navbar from "./components/Navbar";
import WorkoutLibrary from "./components/WorkoutLibrary";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">WORKOUT LIBRARY</p>

            <h1>TRAIN WITH INTENT. LOG EVERY SET.</h1>

            <p className="hero-text">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <a href="#library" className="hero-button">
              BROWSE WORKOUTS →
            </a>
          </div>

          <div className="hero-image">
            <img src="/banner.png" alt="FitLog workout banner" />
          </div>
        </section>

        <WorkoutLibrary />
      </main>
    </>
  );
}