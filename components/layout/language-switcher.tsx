"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/language-context";
import { Language } from "@/lib/translations";

interface LanguageSwitcherProps {
  variant?: "light" | "dark" | "default";
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "ge", label: "ქართული", flag: "🇬🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  const textColor =
    variant === "light"
      ? "text-white/90 hover:text-white hover:bg-white/10"
      : "text-foreground/70 hover:text-foreground hover:bg-muted"; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 rounded-full ${textColor}`}
        >
          <Globe className="h-4 w-4" />
          <span className="font-bold">{currentLang.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] rounded-xl">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`gap-3 cursor-pointer rounded-lg m-1 ${
              language === lang.code ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
