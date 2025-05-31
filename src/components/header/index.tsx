"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CartIcon } from "./cart-icon";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "🛒 Shopping Cart" }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-foreground">
            {title}
          </Link>

          <div className="flex items-center gap-4">
            <CartIcon />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
