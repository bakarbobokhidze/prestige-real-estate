"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/properties/property-card";
import { useProperties } from "@/hooks/use-properties";
import { useLanguage } from "@/context/language-context";

export function LatestListings() {
  const { latestProperties } = useProperties();
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider">
              {t("newOnMarket")}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              {t("latestListings")}
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="self-start md:self-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/properties">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
