"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Building,
  DollarSign,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyList } from "./property-list";
import { PropertyForm } from "./property-form";
import { Property } from "@/types/property";

export function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // 1. ბაზიდან მონაცემების წამოღება
  const fetchProperties = async () => {
    try {
      const res = await fetch(`/api/properties?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddNew = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  // 2. ბაზიდან წაშლა
  const handleDelete = async (id: string) => {
    if (!confirm("დარწმუნებული ხართ, რომ გსურთ წაშლა?")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // 3. ბაზაში შენახვა / განახლება
  const handleFormSubmit = async (data: any) => {
    try {
      const url = editingProperty
        ? `/api/properties/${editingProperty._id}`
        : "/api/properties";

      const method = editingProperty ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchProperties();
        setShowForm(false);
        setEditingProperty(null);
      } else {
        const errData = await res.json();
        alert("Error: " + errData.error);
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("მოხდა შეცდომა შენახვისას");
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  // სტატისტიკა
  const forSale = properties.filter((p) => p.category === "sale").length;
  const forRent = properties.filter((p) => p.category === "rent").length;
  const totalValue = properties
    .filter((p) => p.category === "sale")
    .reduce((sum, p) => sum + (p.price?.gel || 0), 0);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                მართვის პანელი
              </h1>
              <p className="text-muted-foreground mt-1">
                მართეთ თქვენი ქონების განცხადებები ბაზაში
              </p>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-primary text-primary-foreground shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              ქონების დამატება
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
                  სულ ქონება
                </CardTitle>
                <Building className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{properties.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
                  იყიდება
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{forSale}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
                  ქირავდება
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{forRent}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase text-muted-foreground">
                  ჯამური ფასი (₾)
                </CardTitle>
                <DollarSign className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-600">
                  {(totalValue / 1000000).toFixed(1)} მლნ
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-background rounded-xl border shadow-sm">
            <PropertyList
              properties={properties}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}
