import Link from "next/link";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="not-found">
        <p className="eyebrow">ERROR 404</p>

        <h1>WORKOUT NOT FOUND.</h1>

        <p>
          This page doesn't exist. Let's get you back to the workout library.
        </p>

        <Link href="/" className="hero-button">
          BACK TO WORKOUTS →
        </Link>
      </main>
    </>
  );
}