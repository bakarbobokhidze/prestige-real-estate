"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allAmenities } from "@/constants/amenities";
import { useLanguage } from "@/context/language-context";
import { useCurrency } from "@/context/currency-context";

export function PropertyFilters({
  filters,
  onFilterChange,
  onReset,
  onClose,
  isMobile,
}: any) {
  const { language: lang, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const current = filters.amenities || [];
    onFilterChange({
      amenities: checked
        ? [...current, amenity]
        : current.filter((a: string) => a !== amenity),
    });
  };

  const amenityTranslations: Record<string, { ge: string; en: string }> = {
    "ცენტრალური გათბობა": { ge: "ცენტრალური გათბობა", en: "Central Heating" },
    კონდიცირება: { ge: "კონდიცირება", en: "Air Conditioning" },
    ავეჯი: { ge: "ავეჯი", en: "Furniture" },
    აივანი: { ge: "აივანი/ტერასა", en: "Balcony/Terrace" },
    ლიფტი: { ge: "ლიფტი", en: "Elevator" },
    პარკინგი: { ge: "პარკინგი", en: "Parking" },
    სათავსო: { ge: "სათავსო", en: "Storage Room" },

    დაცვა: { ge: "დაცვა/CCTV", en: "Security/CCTV" },
    კონსიერჟი: { ge: "კონსიერჟი", en: "Concierge" },

    აუზი: { ge: "აუზი", en: "Pool" },
    სპორტდარბაზი: { ge: "სპორტდარბაზი", en: "Gym" },
    ბაღი: { ge: "ბაღი/ეზო", en: "Garden/Yard" },
    ბუხარი: { ge: "ბუხარი", en: "Fireplace" },
    "ჭკვიანი სახლი": { ge: "ჭკვიანი სახლი", en: "Smart Home" },
    "შინაური ცხოველებისთვის": {
      ge: "ცხოველები ნებადართულია",
      en: "Pet Friendly",
    },
  };

  const GEORGIAN_CITIES = [
    { value: "tbilisi", ge: "თბილისი", en: "Tbilisi" },
    { value: "batumi", ge: "ბათუმი", en: "Batumi" },
    { value: "kutaisi", ge: "ქუთაისი", en: "Kutaisi" },
    { value: "rustavi", ge: "რუსთავი", en: "Rustavi" },
    { value: "mtskheta", ge: "მცხეთა", en: "Mtskheta" },
    { value: "kobuleti", ge: "ქობულეთი", en: "Kobuleti" },
    { value: "borjomi", ge: "ბორჯომი", en: "Borjomi" },
    { value: "bakuriani", ge: "ბაკურიანი", en: "Bakuriani" },
    { value: "gudauri", ge: "გუდაური", en: "Gudauri" },
    { value: "telavi", ge: "თელავი", en: "Telavi" },
    { value: "sighnaghi", ge: "სიღნაღი", en: "Sighnaghi" },
    { value: "zugdidi", ge: "ზუგდიდი", en: "Zugdidi" },
    { value: "poti", ge: "ფოთი", en: "Poti" },
  ];

  return (
    <div className="bg-card p-6 border border-border rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{t("filters")}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground"
        >
          {t("clearFilters")}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Currency Switcher */}
        <div className="space-y-2">
          <Label>{t("currency")}</Label>
          <div className="flex p-1 bg-secondary rounded-lg">
            <button
              onClick={() => setCurrency("GEL")}
              className={`flex-1 py-1 text-sm rounded-md transition ${currency === "GEL" ? "bg-white shadow-sm font-medium" : ""}`}
            >
              GEL (₾)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`flex-1 py-1 text-sm rounded-md transition ${currency === "USD" ? "bg-white shadow-sm font-medium" : ""}`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <Label>{t("city")}</Label>
          <Select
            value={filters.city || "all"}
            onValueChange={(v) =>
              onFilterChange({ city: v === "all" ? undefined : v })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("allCities")} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-h-[300px] overflow-y-auto z-[9999]"
            >
              <SelectItem value="all">{t("allCities")}</SelectItem>
              {GEORGIAN_CITIES.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {lang === "ge" ? city.ge : city.en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Listing Type */}
        <div className="space-y-2">
          <Label>{t("listingType")}</Label>
          <Select
            value={filters.category || "all"}
            onValueChange={(v) => onFilterChange({ category: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("allTypes")} />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[9999]">
              <SelectItem value="all">{t("allTypes")}</SelectItem>
              <SelectItem value="sale">{t("forSale")}</SelectItem>
              <SelectItem value="rent">{t("forRent")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label>{t("propertyType")}</Label>
          <Select
            value={filters.propertyType || "all"}
            onValueChange={(v) => onFilterChange({ propertyType: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("allProperties")} />
            </SelectTrigger>
            <SelectContent className="z-[9999]" position="popper">
              <SelectItem value="all">{t("allProperties")}</SelectItem>
              <SelectItem value="apartment">{t("typeApartment")}</SelectItem>
              <SelectItem value="house">{t("typeHouse")}</SelectItem>
              <SelectItem value="villa">{t("typeVilla")}</SelectItem>
              <SelectItem value="land">{t("typeLand")}</SelectItem>
              <SelectItem value="commercial">{t("typeCommercial")}</SelectItem>
              <SelectItem value="hotel">{t("typeHotel")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>{t("priceRangeLabel")}</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={t("min")}
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                onFilterChange({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="flex-1"
            />
            <Input
              type="number"
              placeholder={t("max")}
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                onFilterChange({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label>{t("bedrooms")}</Label>
          <Select
            value={filters.minBedrooms?.toString() || "any"}
            onValueChange={(v) =>
              onFilterChange({
                minBedrooms: v === "any" ? undefined : Number(v),
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("any")} />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[9999]">
              <SelectItem value="any">{t("any")}</SelectItem>
              <SelectItem value="0">{t("studio")}</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Square Meters */}
        <div className="space-y-2">
          <Label>{t("squareMeters")}</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={t("min")}
              value={filters.minSquareMeters ?? ""}
              onChange={(e) =>
                onFilterChange({
                  minSquareMeters: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="flex-1"
            />
            <Input
              type="number"
              placeholder={t("max")}
              value={filters.maxSquareMeters ?? ""}
              onChange={(e) =>
                onFilterChange({
                  maxSquareMeters: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* Amenities Section */}
        <div className="space-y-3">
          <Label>{t("amenities")}</Label>
          <div className="grid grid-cols-2 gap-3">
            {allAmenities.slice(0, 10).map((a) => (
              <div key={a} className="flex items-center gap-2">
                <Checkbox
                  id={a}
                  checked={filters.amenities?.includes(a)}
                  onCheckedChange={(c) => handleAmenityChange(a, !!c)}
                />
                <label
                  htmlFor={a}
                  className="text-sm cursor-pointer select-none"
                >
                  {amenityTranslations[a]
                    ? amenityTranslations[a][lang as "ge" | "en"]
                    : a}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isMobile && (
        <Button onClick={onClose} className="w-full mt-6">
          {t("applyFilters")}
        </Button>
      )}
    </div>
  );
}
