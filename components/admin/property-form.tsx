"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Property } from "@/types/property";
import { allAmenities } from "@/constants/amenities";
import { useLanguage } from "@/context/language-context";

interface PropertyFormProps {
  property?: Property | null;
  onSubmit: (data: Omit<Property, "_id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

const CITY_MAP: Record<string, string> = {
  თბილისი: "tbilisi",
  ბათუმი: "batumi",
  ქუთაისი: "kutaisi",
  რუსთავი: "rustavi",
  მცხეთა: "mtskheta",
  ქობულეთი: "kobuleti",
  ბორჯომი: "borjomi",
  ბაკურიანი: "bakuriani",
  გუდაური: "gudauri",
  თელავი: "telavi",
  სიღნაღი: "sighnaghi",
  ზუგდიდი: "zugdidi",
  ფოთი: "poti",
};

const normalizeCity = (raw: string): string => CITY_MAP[raw] ?? raw;

const defaultFormData = {
  titleGe: "",
  titleEn: "",
  descriptionGe: "",
  descriptionEn: "",
  priceGEL: "",
  priceUSD: "",
  category: "sale" as Property["category"],
  propertyType: "apartment" as Property["propertyType"],
  status: "available" as Property["status"],
  featured: false,
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "საქართველო",
  lat: "",
  lng: "",
  bedrooms: "",
  bathrooms: "",
  squareMeters: "",
  floor: "",
  totalFloors: "",
  yearBuilt: "",
  parking: "",
  imageUrls: [""],
  amenities: [] as string[],
};

export function PropertyForm({
  property,
  onSubmit,
  onCancel,
}: PropertyFormProps) {
  const [formData, setFormData] = useState(defaultFormData);
  const { t } = useLanguage();

  useEffect(() => {
    if (property) {
      const rawCity = property.location?.city?.trim() || "";

      const cityMap: Record<string, string> = {
        თბილისი: "tbilisi",
        tbilisi: "tbilisi",
        ბათუმი: "batumi",
        batumi: "batumi",
        ქუთაისი: "kutaisi",
        kutaisi: "kutaisi",
        რუსთავი: "rustavi",
        rustavi: "rustavi",
        მცხეთა: "mtskheta",
        mtskheta: "mtskheta",
        ქობულეთი: "kobuleti",
        kobuleti: "kobuleti",
        ბორჯომი: "borjomi",
        borjomi: "borjomi",
        ბაკურიანი: "bakuriani",
        bakuriani: "bakuriani",
        გუდაური: "gudauri",
        gudauri: "gudauri",
        თელავი: "telavi",
        telavi: "telavi",
        სიღნაღი: "sighnaghi",
        sighnaghi: "sighnaghi",
        ზუგდიდი: "zugdidi",
        zugdidi: "zugdidi",
        ფოთი: "poti",
        poti: "poti",
      };

      const finalCity = cityMap[rawCity] || rawCity;

      setFormData({
        ...defaultFormData,
        titleGe: property.title?.ge || "",
        titleEn: property.title?.en || "",
        descriptionGe: property.description?.ge || "",
        descriptionEn: property.description?.en || "",
        priceGEL: property.price?.gel?.toString() || "",
        priceUSD: property.price?.usd?.toString() || "",
        category: property.category,
        propertyType: (property.propertyType || "apartment") as any,
        status: (property.status || "available") as Property["status"],
        featured: !!property.featured,
        address: property.location?.address || "",
        city: finalCity,
        state: property.location?.state || "",
        zipCode: property.location?.zipCode || "",
        country: property.location?.country || "საქართველო",
        lat: property.location?.coordinates?.lat?.toString() || "",
        lng: property.location?.coordinates?.lng?.toString() || "",
        bedrooms: property.specs?.bedrooms?.toString() || "",
        bathrooms: property.specs?.bathrooms?.toString() || "",
        squareMeters: property.specs?.squareMeters?.toString() || "",
        floor: property.specs?.floor?.toString() || "",
        totalFloors: property.specs?.totalFloors?.toString() || "",
        yearBuilt: property.specs?.yearBuilt?.toString() || "",
        parking: property.specs?.parking?.toString() || "",
        imageUrls: property.images?.length > 0 ? [...property.images] : [""],
        amenities: [...(property.amenities || [])],
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [property]);

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.imageUrls];
    newUrls[index] = value;
    setFormData({ ...formData, imageUrls: newUrls });
  };

  const addImageUrl = () => {
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ""] });
  };

  const removeImageUrl = (index: number) => {
    if (formData.imageUrls.length > 1) {
      const newUrls = formData.imageUrls.filter((_, i) => i !== index);
      setFormData({ ...formData, imageUrls: newUrls });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const propertyData: Omit<Property, "_id" | "createdAt" | "updatedAt"> = {
      title: { ge: formData.titleGe, en: formData.titleEn },
      description: { ge: formData.descriptionGe, en: formData.descriptionEn },
      price: {
        gel: Number(formData.priceGEL) || 0,
        usd: Number(formData.priceUSD) || 0,
      },
      category: formData.category || "sale",
      propertyType: formData.propertyType || "apartment",
      status: formData.status || "available",
      featured: formData.featured,
      location: {
        address: formData.address,
        city: normalizeCity(formData.city),
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        ...(formData.lat &&
          formData.lng && {
            coordinates: {
              lat: Number(formData.lat),
              lng: Number(formData.lng),
            },
          }),
      },
      specs: {
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        squareMeters: Number(formData.squareMeters) || 0,
        floor: Number(formData.floor) || 0,
        totalFloors: Number(formData.totalFloors) || 0,
        yearBuilt: Number(formData.yearBuilt) || 0,
        parking: Number(formData.parking) || 0,
      },
      images: formData.imageUrls.filter((url) => url.trim() !== ""),
      amenities: formData.amenities,
    };

    onSubmit(propertyData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-card border border-border w-full max-w-3xl mx-4 my-auto rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-background">
          <h2 className="text-xl font-semibold text-foreground">
            {property ? "ქონების რედაქტირება" : "ახალი ქონების დამატება"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-background">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground border-b pb-2">
              ძირითადი ინფორმაცია
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titleGe">სათაური (ქართულად)</Label>
                <Input
                  id="titleGe"
                  value={formData.titleGe}
                  onChange={(e) =>
                    setFormData({ ...formData, titleGe: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleEn">Title (English)</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descriptionGe">აღწერა (ქართულად)</Label>
                <Textarea
                  id="descriptionGe"
                  value={formData.descriptionGe}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionGe: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descriptionEn">Description (English)</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              {/* Price Section */}
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div className="space-y-2">
                  <Label>ფასი (GEL)</Label>
                  <Input
                    type="number"
                    value={formData.priceGEL}
                    onChange={(e) =>
                      setFormData({ ...formData, priceGEL: e.target.value })
                    }
                    placeholder="ლარი"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ფასი (USD)</Label>
                  <Input
                    type="number"
                    value={formData.priceUSD}
                    onChange={(e) =>
                      setFormData({ ...formData, priceUSD: e.target.value })
                    }
                    placeholder="დოლარი"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>კატეგორია</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value as "sale" | "rent",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">იყიდება</SelectItem>
                    <SelectItem value="rent">ქირავდება</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("propertyType")}</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      propertyType: value as Property["propertyType"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">
                      {t("typeApartment")}
                    </SelectItem>
                    <SelectItem value="house">{t("typeHouse")}</SelectItem>
                    <SelectItem value="villa">{t("typeVilla")}</SelectItem>
                    <SelectItem value="land">{t("typeLand")}</SelectItem>
                    <SelectItem value="commercial">
                      {t("typeCommercial")}
                    </SelectItem>
                    <SelectItem value="hotel">{t("typeHotel")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>სტატუსი</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as Property["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="აირჩიეთ სტატუსი" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">ხელმისაწვდომი</SelectItem>
                    <SelectItem value="pending">მოლოდინში</SelectItem>
                    <SelectItem value="sold">გაყიდული</SelectItem>
                    <SelectItem value="rented">გაქირავებული</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground border-b pb-2">
              მდებარეობა
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">მისამართი</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>ქალაქი</Label>
                <Select
                  key={`city-${property?._id || "new"}-${Date.now()}`}
                  value={formData.city || ""}
                  onValueChange={(value) => {
                    console.log("User selected city:", value);
                    setFormData({ ...formData, city: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="აირჩიეთ ქალაქი" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[9999]">
                    <SelectItem value="tbilisi">თბილისი</SelectItem>
                    <SelectItem value="batumi">ბათუმი</SelectItem>
                    <SelectItem value="kutaisi">ქუთაისი</SelectItem>
                    <SelectItem value="rustavi">რუსთავი</SelectItem>
                    <SelectItem value="mtskheta">მცხეთა</SelectItem>
                    <SelectItem value="kobuleti">ქობულეთი</SelectItem>
                    <SelectItem value="borjomi">ბორჯომი</SelectItem>
                    <SelectItem value="bakuriani">ბაკურიანი</SelectItem>
                    <SelectItem value="gudauri">გუდაური</SelectItem>
                    <SelectItem value="telavi">თელავი</SelectItem>
                    <SelectItem value="sighnaghi">სიღნაღი</SelectItem>
                    <SelectItem value="zugdidi">ზუგდიდი</SelectItem>
                    <SelectItem value="poti">ფოთი</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">რეგიონი</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">საფოსტო კოდი</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">ქვეყანა</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lat">განედი (Lat)</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  placeholder="41.7151"
                  value={formData.lat}
                  onChange={(e) =>
                    setFormData({ ...formData, lat: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">გრძედი (Lng)</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  placeholder="44.8271"
                  value={formData.lng}
                  onChange={(e) =>
                    setFormData({ ...formData, lng: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground border-b pb-2">
              ქონების მახასიათებლები
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">საძინებლები</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bedrooms: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">სააბაზანოები</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bathrooms: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="squareMeters">ფართობი (მ²)</Label>
                <Input
                  id="squareMeters"
                  type="number"
                  value={formData.squareMeters}
                  onChange={(e) =>
                    setFormData({ ...formData, squareMeters: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking">პარკინგი</Label>
                <Input
                  id="parking"
                  type="number"
                  value={formData.parking}
                  onChange={(e) =>
                    setFormData({ ...formData, parking: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">სართული</Label>
                <Input
                  id="floor"
                  type="number"
                  value={formData.floor}
                  onChange={(e) =>
                    setFormData({ ...formData, floor: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalFloors">სულ სართული</Label>
                <Input
                  id="totalFloors"
                  type="number"
                  value={formData.totalFloors}
                  onChange={(e) =>
                    setFormData({ ...formData, totalFloors: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearBuilt">აშენების წელი</Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) =>
                    setFormData({ ...formData, yearBuilt: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">
                სურათები (გალერეა)
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageUrl}
              >
                <Plus className="h-4 w-4 mr-2" />
                სურათის დამატება
              </Button>
            </div>
            <div className="space-y-3">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={url}
                    onChange={(e) =>
                      handleImageUrlChange(index, e.target.value)
                    }
                  />
                  {formData.imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">კეთილმოწყობა</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={(checked) =>
                      handleAmenityChange(amenity, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, featured: checked as boolean })
              }
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium cursor-pointer"
            >
              გამორჩეული ქონება
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onCancel}>
              გაუქმება
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {property ? "განახლება" : "დამატება"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
