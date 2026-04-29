"use client";

import { Property } from "@/types/property";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

interface PropertyListItemProps {
  property: Property;
}

export function PropertyListItem({ property }: PropertyListItemProps) {
  const { language } = useLanguage();
  const lang = (language === "ge" || language === "en" ? language : "ge") as
    | "ge"
    | "en";

  const formatPrice = (
    price: { gel: number; usd: number },
    category: string,
  ) => {
    const suffix = category === "rent" ? "/თვე" : "";
    const gel = price?.gel ?? 0;
    const usd = price?.usd ?? 0;

    return (
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary">
          {gel.toLocaleString()} ₾{suffix}
        </span>
        <span className="text-lg font-medium text-muted-foreground -mt-1">
          $ {usd.toLocaleString()}
          {suffix}
        </span>
      </div>
    );
  };

  const title = property.title?.[lang] || "";
  const categoryLabel = property.category === "sale" ? "იყიდება" : "ქირავდება";

  return (
    <Link
      href={`/property/${property._id}`}
      className="block group cursor-pointer"
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-card">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-80 h-64 sm:h-auto shrink-0 overflow-hidden">
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
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm shadow-lg">
                {categoryLabel}
              </span>

              {property.status === "sold" && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-sm shadow-lg">
                  გაყიდული
                </span>
              )}
              {property.status === "rented" && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white rounded-sm shadow-lg">
                  გაქირავებული
                </span>
              )}
              {property.status === "pending" && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white rounded-sm shadow-lg">
                  მოლოდინში
                </span>
              )}

              {property.featured && property.status === "available" && (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-black rounded-sm shadow-lg">
                  გამორჩეული
                </span>
              )}
            </div>
          </div>

          <CardContent className="flex-1 p-6">
            <div className="flex flex-col h-full">
              {/* Price */}
              {formatPrice(property.price, property.category)}

              {/* Title */}
              <h3 className="mt-3 font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm line-clamp-1">
                  {property.location?.address}, {property.location?.city}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {property.description?.[lang] || ""}
              </p>

              {/* Specs */}
              <div className="flex items-center gap-6 mt-auto pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="p-1.5 bg-primary/10 rounded-full">
                    <Bed className="h-4 w-4 text-primary" />
                  </div>
                  <span>{property.specs?.bedrooms ?? 0} საძ.</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="p-1.5 bg-primary/10 rounded-full">
                    <Bath className="h-4 w-4 text-primary" />
                  </div>
                  <span>{property.specs?.bathrooms ?? 0} სააბ.</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="p-1.5 bg-primary/10 rounded-full">
                    <Maximize className="h-4 w-4 text-primary" />
                  </div>
                  <span>{property.specs?.squareMeters ?? 0} მ²</span>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
