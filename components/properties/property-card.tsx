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

export function PropertyCard({ property }: PropertyCardProps) {
  const { language: lang } = useLanguage();
  const { convertPrice, currency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayPrice = convertPrice(property.price);
  const currencySymbol = currency === "GEL" ? "₾" : "$";
  const title = property.title?.[lang as keyof typeof property.title] || "";
  const categoryLabel = property.category === "sale" ? "იყიდება" : "ქირავდება";

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
            {property.status === "sold" && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-sm">
                გაყიდული
              </span>
            )}
            {property.status === "rented" && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white rounded-sm">
                გაქირავებული
              </span>
            )}
            {property.status === "pending" && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white rounded-sm">
                მოლოდინში
              </span>
            )}

            {property.status === "available" && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm">
                {categoryLabel}
              </span>
            )}

            {property.featured && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-black rounded-sm">
                გამორჩეული
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
                      / თვე
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Title */}
          <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm line-clamp-1">
              {property.location?.city}, {property.location?.state}
            </span>
          </div>

          {/* Specs */}
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
              <span>{property.specs?.squareMeters ?? 0} მ²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
