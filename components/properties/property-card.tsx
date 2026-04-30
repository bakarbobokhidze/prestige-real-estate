"use client";

import { Property } from "@/types/property";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useCurrency } from "@/context/currency-context";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

// ზუსტად იგივე ობიექტი, რაც PropertyDetails-ში გაქვს
const cityTranslations: Record<string, { ge: string; en: string }> = {
  tbilisi: { ge: "თბილისი", en: "Tbilisi" },
  batumi: { ge: "ბათუმი", en: "Batumi" },
  kutaisi: { ge: "ქუთაისი", en: "Kutaisi" },
  rustavi: { ge: "რუსთავი", en: "Rustavi" },
  mtskheta: { ge: "მცხეთა", en: "Mtskheta" },
  kobuleti: { ge: "ქობულეთი", en: "Kobuleti" },
  borjomi: { ge: "ბორჯომი", en: "Borjomi" },
  bakuriani: { ge: "ბაკურიანი", en: "Bakuriani" },
  gudauri: { ge: "გუდაური", en: "Gudauri" },
  telavi: { ge: "თელავი", en: "Telavi" },
  sighnaghi: { ge: "სიღნაღი", en: "Sighnaghi" },
  zugdidi: { ge: "ზუგდიდი", en: "Zugdidi" },
  poti: { ge: "ფოთი", en: "Poti" },
};

export function PropertyCard({ property }: PropertyCardProps) {
  const { language } = useLanguage();
  // ვუზრუნველყოფთ რომ lang იყოს "ge" ან "en" (შენი კონტექსტის მიხედვით)
  const lang = (language === "ka" ? "ge" : language) as "ge" | "en";

  const { convertPrice, currency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayPrice = convertPrice(property.price);
  const currencySymbol = currency === "GEL" ? "₾" : "$";

  // სათაურის თარგმანი
  const title = property.title?.[language as keyof typeof property.title] || "";

  // კატეგორიის და სტატუსის თარგმანი
  const t = (key: string) => {
    const labels: any = {
      ge: {
        sale: "იყიდება",
        rent: "ქირავდება",
        sold: "გაყიდული",
        rented: "გაქირავებული",
        pending: "მოლოდინში",
        featured: "გამორჩეული",
        mo: "/თვე",
      },
      en: {
        sale: "For Sale",
        rent: "For Rent",
        sold: "Sold",
        rented: "Rented",
        pending: "Pending",
        featured: "Featured",
        mo: "/mo",
      },
    };
    return labels[lang][key] || key;
  };

  // ქალაქის თარგმანის ლოგიკა (ზუსტად როგორც PropertyDetails-ში)
  const cityName = property.location?.city?.toLowerCase().trim() || "";
  const translatedCity =
    cityTranslations[cityName]?.[lang] || property.location?.city;

  return (
    <Link
      href={`/property/${property._id}`}
      className="block group cursor-pointer"
    >
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          {property.images?.[0] ? (
            <img
              src={property.images[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              No Image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-4">
            {property.status !== "available" && (
              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-sm ${
                  property.status === "sold"
                    ? "bg-red-600"
                    : property.status === "rented"
                      ? "bg-blue-600"
                      : "bg-orange-500"
                }`}
              >
                {t(property.status)}
              </span>
            )}
            {property.status === "available" && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm">
                {t(property.category)}
              </span>
            )}
            {property.featured && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-black rounded-sm">
                {t("featured")}
              </span>
            )}
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg">
              {!mounted ? (
                <span className="text-lg font-bold">...</span>
              ) : (
                <div
                  className="flex items-center gap-1 text-lg font-bold text-foreground"
                  suppressHydrationWarning
                >
                  {currency === "USD" && <span>{currencySymbol}</span>}
                  <span>{Number(displayPrice || 0).toLocaleString()}</span>
                  {currency === "GEL" && <span>{currencySymbol}</span>}
                  {property.category === "rent" && (
                    <span className="text-sm font-medium opacity-70">
                      {" "}
                      {t("mo")}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm line-clamp-1">
              {translatedCity}, {property.location?.state}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Bed className="h-4 w-4" />
              <span>{property.specs?.bedrooms ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Bath className="h-4 w-4" />
              <span>{property.specs?.bathrooms ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Maximize className="h-4 w-4" />
              <span>
                {property.specs?.squareMeters ?? 0}{" "}
                {lang === "ge" ? "მ²" : "m²"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
