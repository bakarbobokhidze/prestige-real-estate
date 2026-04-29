"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/context/language-context";

export function HeaderStatic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary-foreground/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-primary-foreground">
              {t("brandName")}
              <span className="text-accent">{t("brandName2")}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              {t("navHome")}
            </Link>
            <Link
              href="/properties"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              {t("navProperties")}
            </Link>
            <Link
              href="/properties?category=sale"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              {t("navForSale")}
            </Link>
            <Link
              href="/properties?category=rent"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              {t("navForRent")}
            </Link>
          </nav>

          {/* Contact Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+995 595 52 82 34"
              className="flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+995 595 52 82 34</span>
            </a>
            <LanguageSwitcher variant="light" />
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/properties">{t("navViewListings")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher variant="light" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary-foreground"
              aria-label={t("navToggleMenu")}
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
          <div className="md:hidden border-t border-primary-foreground/10">
            <nav className="flex flex-col p-4 gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navHome")}
              </Link>
              <Link
                href="/properties"
                className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navProperties")}
              </Link>
              <Link
                href="/properties?category=sale"
                className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navForSale")}
              </Link>
              <Link
                href="/properties?category=rent"
                className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navForRent")}
              </Link>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full mt-2"
              >
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
