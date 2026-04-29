"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/context/language-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`text-2xl font-bold tracking-tighter transition-colors ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {t("brandName")}
              <span className="text-accent">{t("brandName2")}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["navHome", "navProperties", "navForSale", "navForRent"].map(
              (item) => (
                <Link
                  key={item}
                  href={
                    item === "navHome"
                      ? "/"
                      : `/properties${item === "navForSale" ? "?category=sale" : item === "navForRent" ? "?category=rent" : ""}`
                  }
                  className={`text-sm font-semibold transition-all hover:opacity-100 ${
                    scrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t(item)}
                </Link>
              ),
            )}
          </nav>

          {/* Contact Button & Switches */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+995 595 52 82 34"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Phone className="h-4 w-4" />
              </div>
              <span className="hidden lg:inline">+995 595 52 82 34</span>
            </a>

            <LanguageSwitcher variant={scrolled ? "default" : "light"} />

            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 shadow-lg shadow-accent/20"
            >
              <Link href="/properties">{t("navViewListings")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <LanguageSwitcher variant={scrolled ? "default" : "light"} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col p-6 gap-4">
              {["navHome", "navProperties", "navForSale", "navForRent"].map(
                (item) => (
                  <Link
                    key={item}
                    href="/"
                    className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item)}
                  </Link>
                ),
              )}
              <Button asChild className="w-full bg-accent mt-4 rounded-xl">
                <Link href="/properties" onClick={() => setIsMenuOpen(false)}>
                  {t("navViewListings")}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
