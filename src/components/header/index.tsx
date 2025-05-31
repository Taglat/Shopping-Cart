import React from "react";
import { ThemeToggle } from "../theme/theme-toggle";

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className = "" }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[var(--background)] text-[var(--foreground)] flex justify-between items-center shadow-md ${className}`}
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
