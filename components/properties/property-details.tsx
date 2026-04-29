"use client";

import { Property } from "@/types/property";
import { useLanguage } from "@/context/language-context";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ArrowUpCircle,
  Check,
} from "lucide-react";

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

export function PropertyDetails({ property }: { property: Property }) {
  const { language: lang } = useLanguage();

  const t = (key: string) => {
    const translations: any = {
      ge: {
        forSale: "იყიდება",
        forRent: "ქირავდება",
        featured: "გამორჩეული",
        perMonth: "/თვე",
        beds: "საძინებელი",
        baths: "სააბაზანო",
        squareMeters: "ფართობი",
        floor: "სართული",
        description: "აღწერა",
        amenitiesTitle: "კეთილმოწყობა",
        location: "მდებარეობა",
        statusSold: "გაყიდული",
        statusRented: "გაქირავებული",
        statusPending: "მოლოდინში",
        included: "შედის",
        mapUnavailable: "რუკა მიუწვდომელია",
      },
      en: {
        forSale: "For Sale",
        forRent: "For Rent",
        featured: "Featured",
        perMonth: "/month",
        beds: "Bedrooms",
        baths: "Bathrooms",
        squareMeters: "Area",
        floor: "Floor",
        description: "Description",
        amenitiesTitle: "Amenities",
        location: "Location",
        statusSold: "Sold",
        statusRented: "Rented",
        statusPending: "Pending",
        included: "Included",
        mapUnavailable: "Map Unavailable",
      },
    };
    return translations[lang === "en" ? "en" : "ge"][key] || key;
  };

  const cityTranslations: Record<string, { ge: string; en: string }> = {
    tbilisi: { ge: "თბილისი", en: "Tbilisi" },
    batumi: { ge: "ბათუმი", en: "Batumi" },
    kutaisi: { ge: "ქუთაისი", en: "Kutaisi" },
    rustavi: { ge: "რუსთავი", en: "Rustavi" },
    mtskheta: { ge: "მცხეთა", en: "Mtskheta" },
    kobuleti: { ge: "ქობულეთი", en: "Kobuleti" },
    borjomi: { ge: "ბორჯომი", en: "Borjomi" },
    bakuriani: { ge: "ბაკურიანი", en: "Bakuriani" },
    gudauri: { ge: "გუდაური", en: "Gudauri" },
    telavi: { ge: "თელავი", en: "Telavi" },
    sighnaghi: { ge: "სიღნაღი", en: "Sighnaghi" },
    zugdidi: { ge: "ზუგდიდი", en: "Zugdidi" },
    poti: { ge: "ფოთი", en: "Poti" },
  };

  const title = property.title?.[lang as keyof typeof property.title] || "";
  const description =
    property.description?.[lang as keyof typeof property.description] || "";

  const gelPrice = property.price?.gel ?? 0;
  const usdPrice = property.price?.usd ?? 0;
  const suffix = property.category === "rent" ? t("perMonth") : "";
  const cityNameEn =
    cityTranslations[property.location.city]?.en || property.location.city;
  const fullAddress = `${property.location.address}, ${cityNameEn}, Georgia`;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-background">
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {property.status === "sold" && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
              {t("statusSold")}
            </span>
          )}
          {property.status === "rented" && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
              {t("statusRented")}
            </span>
          )}
          {property.status === "pending" && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
              {t("statusPending")}
            </span>
          )}

          {property.status === "available" && (
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
              {property.category === "sale" ? t("forSale") : t("forRent")}
            </span>
          )}

          {property.featured && (
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
              {t("featured")}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
          {title}
        </h1>

        {/* Location Section */}
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          <span className="text-lg">
            {property.location?.address},
            {cityTranslations[property.location?.city || ""]?.[
              lang as "ge" | "en"
            ] || property.location?.city}
            ,{property.location?.state}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pt-4 border-t border-border/50">
          <span
            className="text-4xl font-black text-primary"
            suppressHydrationWarning
          >
            {usdPrice.toLocaleString()} ${suffix}
          </span>
          <span
            className="text-2xl font-semibold text-muted-foreground"
            suppressHydrationWarning
          >
            {gelPrice.toLocaleString()} ₾{suffix}
          </span>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Bed className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
              {t("beds")}
            </p>
            <p className="text-xl font-bold">{property.specs?.bedrooms ?? 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Bath className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
              {t("baths")}
            </p>
            <p className="text-xl font-bold">
              {property.specs?.bathrooms ?? 0}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Maximize className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
              {t("squareMeters")}
            </p>
            <p className="text-xl font-bold">
              {property.specs?.squareMeters ?? 0} m²
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ArrowUpCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
              {t("floor")}
            </p>
            <p className="text-xl font-bold">
              {property.specs?.floor ?? 0} /{" "}
              {property.specs?.totalFloors ?? property.specs?.floor ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          {t("description")}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Amenities */}
      <div className="bg-gradient-to-br from-muted/50 to-background p-8 rounded-3xl border border-border/60 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground italic">
            {t("amenitiesTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {property.amenities?.map((item) => (
            <div
              key={item}
              className="group relative flex items-center gap-4 bg-card/40 backdrop-blur-sm p-4 rounded-2xl border border-border/40 hover:border-primary/40 hover:bg-background hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-1/2 bg-primary rounded-r-full transition-all duration-300" />

              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                  {amenityTranslations[item]?.[lang as "ge" | "en"] || item}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {t("included")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location / Map Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">{t("location")}</h2>
        <div className="aspect-video w-full rounded-2xl overflow-hidden border-2 border-border shadow-md bg-muted">
          {property.location?.address ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50 italic">
              {t("mapUnavailable")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
