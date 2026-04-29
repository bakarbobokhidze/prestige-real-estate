"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { HeaderStatic } from "@/components/layout/header-static";
import { Footer } from "@/components/layout/footer";
import { PropertyGrid } from "@/components/properties/property-grid";
import { useProperties } from "@/hooks/use-properties";
import { useLanguage } from "@/context/language-context"; 

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const {
    properties,
    filters,
    updateFilters,
    resetFilters,
  } = useProperties();

  useEffect(() => {
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const price = searchParams.get("price");

    const newFilters: Record<string, unknown> = {};
    
    if (category) newFilters.category = category;
    if (type) newFilters.propertyType = type;
    if (location) newFilters.location = location;
    
    if (price) {
      const [min, max] = price.split("-");
      if (min) newFilters.minPrice = Number(min);
      if (max && max !== "+") newFilters.maxPrice = Number(max);
    }

    if (Object.keys(newFilters).length > 0) {
      updateFilters(newFilters);
    }
  }, [searchParams, updateFilters]);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderStatic />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              {t("propertiesTitle")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("propertiesSubtitle")} 
            </p>
          </div>

          <PropertyGrid
            properties={properties}
            filters={filters}
            onFilterChange={updateFilters}
            onResetFilters={resetFilters}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}