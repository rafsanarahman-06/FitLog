import "./globals.css";
import { FitLogProvider } from "./context/FitLogContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "A dark workout library and daily workout planner.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}

          <footer className="footer">
            <div className="footer-inner">
              <a href="/" className="footer-brand">
                <img src="/logo.png" alt="FitLog logo" />
                <span>FitLog</span>
              </a>

              <p>
                © 2026 FitLog — Workout Library. Train hard, log honest.
              </p>
            </div>
          </footer>

          <Toaster position="top-right" />
        </FitLogProvider>
      </body>
    </html>
  );
}