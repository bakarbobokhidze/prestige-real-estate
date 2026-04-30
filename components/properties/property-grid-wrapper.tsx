"use client";

import { useEffect, useCallback } from "react";
import { PropertyGrid } from "./property-grid";
import { useProperties } from "@/hooks/use-properties";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function PropertyGridWrapper({
  initialProperties,
}: {
  initialProperties: any[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { properties, filters, updateFilters, resetFilters, setProperties } =
    useProperties();

  useEffect(() => {
    if (initialProperties) setProperties(initialProperties);
  }, [initialProperties, setProperties]);

  useEffect(() => {
    const params: any = {};
    searchParams.forEach((value, key) => {
      if (key === "minPrice" || key === "maxPrice") params[key] = Number(value);
      else params[key] = value;
    });
    updateFilters(params);
  }, [searchParams, updateFilters]);

  const handleFilterChange = useCallback(
    (newFilters: any) => {
      const updatedFilters = { ...filters, ...newFilters };
      const params = new URLSearchParams();

      if (newFilters.city && newFilters.city !== "all") {
        delete updatedFilters.location;
      }

      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "" && value !== "any") {
          params.set(key, String(value));
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [filters, pathname, router],
  );

  return (
    <PropertyGrid
      properties={properties}
      filters={filters}
      onFilterChange={handleFilterChange}
      onResetFilters={() => {
        resetFilters();
        router.push(pathname);
      }}
    />
  );
}
