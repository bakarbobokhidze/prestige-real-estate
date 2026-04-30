"use client";

import { useState } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "./property-card";
import { PropertyListItem } from "./property-list-item";
import { PropertyFilters } from "./property-filters";
import { Property, PropertyFilters as FilterType } from "@/types/property";
import { useLanguage } from "@/context/language-context";

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

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-24">
          <PropertyFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onResetFilters}
          />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">
              {properties.length}
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

        {properties.length === 0 ? (
          <div className="text-center py-24 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
            <p className="text-xl font-bold text-foreground">
              {t("noPropertiesFound")}
            </p>
            <Button
              variant="default"
              onClick={onResetFilters}
              className="mt-4 px-8 rounded-full"
            >
              {t("clearFilters")}
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {properties.map((property) =>
              viewMode === "grid" ? (
                <PropertyCard key={property._id} property={property} />
              ) : (
                <PropertyListItem key={property._id} property={property} />
              ),
            )}
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
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-2xl overflow-y-auto">
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
