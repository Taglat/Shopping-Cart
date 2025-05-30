"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle Theme
    </button>
  );
}
