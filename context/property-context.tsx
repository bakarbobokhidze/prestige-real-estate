"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProperties } from "@/hooks/use-properties";
import { Property, PropertyFilters } from "@/types/property";

type PropertyContextType = ReturnType<typeof useProperties>;

const PropertyContext = createContext<PropertyContextType | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const propertyState = useProperties();

  return (
    <PropertyContext.Provider value={propertyState}>
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("usePropertyContext must be used within a PropertyProvider");
  }
  return context;
}
