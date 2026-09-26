"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const { plan, saved } = useFitLog();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link href="/" className="brand" onClick={closeMenu}>
          <img src="/logo.png" alt="FitLog logo" />
          <span>FitLog</span>
        </Link>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`nav-link ${
              pathname === "/my-plan" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            My Plan
          </Link>
        </div>

        <div className="nav-counters">
          <Link href="/my-plan" className="counter-link" onClick={closeMenu}>
            <span>Plan</span>
            <span className="nav-count filled">{plan.length}</span>
          </Link>

          <Link href="/my-plan" className="counter-link" onClick={closeMenu}>
            <span>Saved</span>
            <span className="nav-count outlined">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}