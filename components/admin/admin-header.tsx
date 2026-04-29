"use client";

import Link from "next/link";
import { LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminContext } from "@/context/admin-context";

export function AdminHeader() {
  const { logout } = useAdminContext();

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary-foreground/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-primary-foreground">
              Nini's<span className="text-accent">Homes</span>
            </span>
            <span className="text-sm text-primary-foreground/70 border-l border-primary-foreground/20 pl-3 ml-3">
              ადმინი
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                საიტის ნახვა
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              გასვლა
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
