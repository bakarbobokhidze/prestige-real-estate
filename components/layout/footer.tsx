"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-semibold tracking-tight">
                {t("brandName")}
                <span className="text-accent">{t("brandName2")}</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {t("footerDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("allProperties")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=sale"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("forSale")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=rent"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("forRent")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t("propertyTypes")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("apartments")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("houses")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=villa"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("villas")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=land"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("land")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("commercial")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=hotels"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t("hotels")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+995 595 52 82 34"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    +995 595 52 82 34
                  </a>
                  <a
                    href="tel:+995 593 46 17 16"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    +995 593 46 17 16
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a
                  href="mailto:ninisportfolio@gmail.com"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  ninisportfolio@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50 text-center">
            {new Date().getFullYear()} {t("brandName")}
            {t("brandName2")} {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
