"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { trackEvent } from "@/hooks/use-analytics";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
    setIsDark(!isDark);
    trackEvent("theme_toggled", {
      new_theme: !isDark ? "dark" : "light",
    });
  };

  const handleNavClick = (location: string) => {
    trackEvent("navigation_clicked", {
      link: location,
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={isDark ? "/logo_black.png" : "/logo_white.png"}
              alt="MUVEZ Logo"
              width={50}
              height={50}
              className="h-[50px] w-auto"
            />
            <div className="text-2xl font-bold tracking-tight text-primary hidden sm:block">
              MUVEZ
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              onClick={() => handleNavClick("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
           
            <button
              onClick={toggleTheme}
              className="p-2 rounded-sm hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link 
              href="/cart"
              onClick={() => handleNavClick("cart")}
              className="relative p-2 hover:bg-muted rounded-sm transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link 
              href="/cart"
              onClick={() => handleNavClick("cart")}
              className="relative p-2 hover:bg-muted rounded-sm transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-sm hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link 
              href="/"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded transition-colors"
              onClick={() => {
                setIsOpen(false);
                handleNavClick("home");
              }}
            >
              Home
            </Link>
           
          </div>
        )}
      </div>
    </nav>
  );
}
