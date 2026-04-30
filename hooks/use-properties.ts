"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Property, PropertyFilters } from "@/types/property";

export function useProperties(initialFilters?: PropertyFilters) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters || {});
  const [properties, setPropertiesState] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. მონაცემების წამოღება ბაზიდან
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/properties");
      const data = await response.json();
      setPropertiesState(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setProperties = useCallback((newProperties: Property[]) => {
    setPropertiesState(newProperties);
  }, []);

  useEffect(() => {
    if (properties.length === 0) {
      fetchProperties();
    }
  }, [fetchProperties, properties.length]);

  // 2. ფილტრაციის ლოგიკა
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (
        filters.category &&
        filters.category !== "all" &&
        property.category !== filters.category
      )
        return false;

      if (
        filters.propertyType &&
        filters.propertyType !== "all" &&
        property.propertyType !== filters.propertyType
      )
        return false;

      // ფასის შემოწმება
      const price = property.price?.amount || 0;
      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;

      // Bedrooms
      if (filters.minBedrooms && property.specs.bedrooms < filters.minBedrooms)
        return false;

      // Location search
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        const cityMatch = property.location.city.toLowerCase().includes(searchTerm);
        const addressMatch = property.location.address.toLowerCase().includes(searchTerm);
        if (!cityMatch && !addressMatch) return false;
      }

      return true;
    });
  }, [properties, filters]);

  // 3. ადმინის ფუნქციები
  const addProperty = useCallback(
    async (propertyData: Partial<Property>) => {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });
      if (res.ok) {
        await fetchProperties(); 
      }
    },
    [fetchProperties],
  );

  const deleteProperty = useCallback(async (id: string) => {
    const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPropertiesState((prev) => prev.filter((p) => p._id !== id));
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => setFilters({}), []);

  const featuredProperties = useMemo(
    () => properties.filter((p) => p.featured),
    [properties],
  );
  
  const latestProperties = useMemo(() => properties.slice(0, 6), [properties]);

  const getPropertyById = useCallback(
    (id: string) => {
      return properties.find((p) => p._id === id);
    },
    [properties],
  );

  return {
    properties: filteredProperties, 
    allProperties: properties,      
    featuredProperties,
    latestProperties,
    loading,
    filters,
    setProperties, 
    getPropertyById,
    updateFilters,
    resetFilters,
    addProperty,
    deleteProperty,
    refreshProperties: fetchProperties,
  };
}