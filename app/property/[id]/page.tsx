"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { HeaderStatic } from "@/components/layout/header-static";
import { Footer } from "@/components/layout/footer";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyDetails } from "@/components/properties/property-details";
import { ContactForm } from "@/components/properties/contact-form";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { Property } from "@/types/property";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const resolvedParams = use(params);
  const { language: lang, t } = useLanguage(); 

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${resolvedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!property) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderStatic />
      <main className="flex-1">
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToProperties") || "უკან დაბრუნება"}
            </Link>
          </Button>
        </div>

        {/* Gallery */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertyGallery
            images={property.images}
            title={property.title?.[lang] || property.title?.ge || ""}
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyDetails property={property} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ContactForm
                  propertyTitle={
                    property.title?.[lang] || property.title?.ge || ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
