"use client";

import { useEffect } from "react";
import { PropertyGrid } from "./property-grid";
import { useProperties } from "@/hooks/use-properties";
import { useSearchParams } from "next/navigation";

export function PropertyGridWrapper({
  initialProperties,
}: {
  initialProperties: any[];
}) {
  const searchParams = useSearchParams();
  const { properties, filters, updateFilters, resetFilters, setProperties } =
    useProperties();

  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
    }
  }, [initialProperties, setProperties]);

  useEffect(() => {
    const newFilters: any = {};
    searchParams.forEach((value, key) => {
      if (key === "price") {
        const [min, max] = value.split("-");
        newFilters.minPrice = Number(min);
        if (max && max !== "+") newFilters.maxPrice = Number(max);
      } else {
        newFilters[key] = value;
      }
    });
    if (Object.keys(newFilters).length > 0) updateFilters(newFilters);
  }, [searchParams, updateFilters]);

  return (
    <PropertyGrid
      properties={properties.length > 0 ? properties : initialProperties}
      filters={filters}
      onFilterChange={updateFilters}
      onResetFilters={resetFilters}
    />
  );
}
