"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "./property-card";
import { PropertyListItem } from "../properties/property-list-item"; 
import { PropertyFilters } from "./property-filters";
import { Property, PropertyFilters as FilterType } from "@/types/property";
import { useLanguage } from "@/context/language-context";
import { useCurrency } from "@/context/currency-context";

interface PropertyGridProps {
  properties: Property[];
  filters: any;
  onFilterChange: (filters: Partial<FilterType>) => void;
  onResetFilters: () => void;
}

export function PropertyGrid({
  properties,
  filters,
  onFilterChange,
  onResetFilters,
}: PropertyGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { t } = useLanguage();
  const { currency } = useCurrency();

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      if (filters.city && filters.city !== "all") {
        if (item.location.city.toLowerCase() !== filters.city.toLowerCase())
          return false;
      }

      if (filters.category && filters.category !== "all") {
        if (item.category !== filters.category) return false;
      }

      if (filters.propertyType && filters.propertyType !== "all") {
        if (item.propertyType !== filters.propertyType) return false;
      }

      const itemPrice =
        currency === "GEL" ? item.price?.gel || 0 : item.price?.usd || 0;

      if (filters.minPrice && itemPrice < filters.minPrice) return false;
      if (filters.maxPrice && itemPrice > filters.maxPrice) return false;

      if (filters.minBedrooms && item.specs.bedrooms < filters.minBedrooms)
        return false;

      if (
        filters.minSquareMeters &&
        item.specs.squareMeters < filters.minSquareMeters
      )
        return false;
      if (
        filters.maxSquareMeters &&
        item.specs.squareMeters > filters.maxSquareMeters
      )
        return false;

      if (filters.amenities && filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((a: string) =>
          item.amenities.includes(a),
        );
        if (!hasAll) return false;
      }

      return true;
    });
  }, [properties, filters, currency]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters (Desktop) */}
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-24">
          <PropertyFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onResetFilters}
          />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">
              {filteredProperties.length}
            </span>{" "}
            {t("listingsFound") || "ქონება ნაპოვნია"}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {t("filters") || "ფილტრები"}
            </Button>

            <div className="flex border border-border overflow-hidden rounded-md bg-card">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none h-9 px-3"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none h-9 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Rendering */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-24 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
            <div className="max-w-xs mx-auto space-y-3">
              <p className="text-xl font-bold text-foreground">
                {t("noPropertiesFound") || "ქონება ვერ მოიძებნა"}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("tryChangingFilters") ||
                  "სცადეთ ფილტრების შეცვლა ან გასუფთავება"}
              </p>
              <Button
                variant="default"
                onClick={onResetFilters}
                className="mt-4 px-8 rounded-full"
              >
                {t("clearFilters") || "ფილტრების გასუფთავება"}
              </Button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <PropertyListItem key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
              <h3 className="font-bold">{t("filters") || "ფილტრები"}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <PropertyFilters
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={onResetFilters}
              onClose={() => setShowMobileFilters(false)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  );
}
