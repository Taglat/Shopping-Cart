"use client";
import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={cn(
        className,
        "px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 hover:opacity-90 focus:outline-none"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle Theme
    </button>
  );
}
