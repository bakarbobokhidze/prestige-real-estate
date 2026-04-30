"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/language-context";

const locationMap: Record<string, string> = {
  თბილისი: "tbilisi",
  ბათუმი: "batumi",
  ქუთაისი: "kutaisi",
  რუსთავი: "rustavi",
  მცხეთა: "mtskheta",
  ქობულეთი: "kobuleti",
  ბორჯომი: "borjomi",
  ბაკურიანი: "bakuriani",
  გუდაური: "gudauri",
  თელავი: "telavi",
  სიღნაღი: "sighnaghi",
  ზუგდიდი: "zugdidi",
  ფოთი: "poti",
};

export function HeroSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) {
      const trimmedLocation = location.trim();

      const locationValue =
        locationMap[trimmedLocation] || trimmedLocation.toLowerCase();

      params.set("location", locationValue);
    }

    if (priceRange) params.set("price", priceRange);

    if (propertyType && propertyType !== "all") {
      params.set("type", propertyType);
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax & Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center">
        <div className="text-center max-w-4xl mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            {t("heroTitle")}
            <span className="block text-accent drop-shadow-md">
              {t("heroTitleHighlight")}
            </span>
          </h1>
        </div>

        {/* Floating Search Bar with Glassmorphism */}
        <div className="w-full max-w-5xl group">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-[2.5rem] shadow-2xl border border-white/20">
            <div className="bg-white rounded-[2.2rem] p-3 md:p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
              {/* Location Input */}
              <div className="relative flex items-center px-4 border-r border-border/50 h-14 group/input">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <Input
                  type="text"
                  placeholder={t("heroLocation")}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter-ზე ძებნა
                  className="border-0 focus-visible:ring-0 text-base shadow-none h-full w-full"
                />
              </div>

              {/* Price Range Select */}
              <div className="relative flex items-center px-4 border-r border-border/50 h-14">
                <DollarSign className="h-5 w-5 text-primary shrink-0" />
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="border-0 focus:ring-0 text-base shadow-none h-full bg-transparent">
                    <SelectValue placeholder={t("heroPriceRange")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="0-100000">
                      {t("priceUpTo100k")}
                    </SelectItem>
                    <SelectItem value="100000-200000">
                      {t("price100kTo200k")}
                    </SelectItem>
                    <SelectItem value="200000-350000">
                      {t("price200kTo350k")}
                    </SelectItem>
                    <SelectItem value="350000-500000">
                      {t("price350kTo500k")}
                    </SelectItem>
                    <SelectItem value="500000-1000000">
                      {t("price500kTo1m")}
                    </SelectItem>
                    <SelectItem value="1000000+">{t("price1mPlus")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type Select */}
              <div className="relative flex items-center px-4 border-r border-border/50 h-14">
                <Home className="h-5 w-5 text-primary shrink-0" />
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="border-0 focus:ring-0 text-base shadow-none h-full bg-transparent">
                    <SelectValue placeholder={t("heroPropertyType")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="all">{t("heroAllTypes")}</SelectItem>
                    <SelectItem value="apartment">
                      {t("typeApartment")}
                    </SelectItem>
                    <SelectItem value="house">{t("typeHouse")}</SelectItem>
                    <SelectItem value="villa">{t("typeVilla")}</SelectItem>
                    <SelectItem value="land">{t("typeLand")}</SelectItem>
                    <SelectItem value="commercial">
                      {t("typeCommercial")}
                    </SelectItem>
                    <SelectItem value="hotel">{t("typeHotel")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSearch}
                className="h-14 w-full rounded-[1.8rem] bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5 stroke-[3]" />
                {t("heroSearch")}
              </Button>
            </div>
          </div>
        </div>

        {/* Minimalist Stats Section */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24">
          {/* Stat Item 1 */}
          <div className="text-center group cursor-default transition-all duration-500 hover:-translate-y-2">
            <div className="relative">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />

              <p className="text-4xl md:text-5xl font-black text-white group-hover:text-accent transition-colors duration-300">
                100+
              </p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] font-bold text-white/60 group-hover:text-white group-hover:tracking-[0.3em] transition-all duration-300">
              {t("heroStats1")}
            </p>
          </div>

          {/* Stat Item 2 */}
          <div className="text-center group cursor-default transition-all duration-500 hover:-translate-y-2">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />

              <p className="text-4xl md:text-5xl font-black text-white group-hover:text-accent transition-colors duration-300">
                200+
              </p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] font-bold text-white/60 group-hover:text-white group-hover:tracking-[0.3em] transition-all duration-300">
              {t("heroStats2")}
            </p>
          </div>

          {/* Stat Item 3 */}
          <div className="text-center group cursor-default transition-all duration-500 hover:-translate-y-2">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />

              <p className="text-4xl md:text-5xl font-black text-white group-hover:text-accent transition-colors duration-300">
                5+
              </p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] font-bold text-white/60 group-hover:text-white group-hover:tracking-[0.3em] transition-all duration-300">
              {t("heroStats3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
