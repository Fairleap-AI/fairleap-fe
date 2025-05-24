"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Demo", href: "#demo" },
    { name: "Impact", href: "#impact" },
    { name: "Technology", href: "#technology" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">FairLeap</h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
          {/* CTA Buttons */}{" "}
          <div className="hidden md:flex items-center space-x-4">
            {" "}
            <Button variant="ghost" asChild>
              {" "}
              <a href="/auth/sign-in">Login</a>{" "}
            </Button>{" "}
            <Button asChild>
              {" "}
              <a href="/auth/sign-up">Get Started</a>{" "}
            </Button>{" "}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" asChild>
                  <a href="/auth/sign-in">Login</a>
                </Button>
                <Button asChild>
                  <a href="/auth/sign-up">Get Started</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
