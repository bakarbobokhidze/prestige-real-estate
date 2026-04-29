export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  parking?: number;
}

export interface TranslatedText {
  ge: string;
  en: string;
}

export interface Property {
  _id: string;
  title: TranslatedText;
  description: TranslatedText;
  price: {
    gel: number;
    usd: number;
    currency: "GEL" | "USD";
  };
  category: "sale" | "rent";
  propertyType:
    | "apartment"
    | "house"
    | "villa"
    | "land"
    | "commercial"
    | "hotel";
  location: PropertyLocation;
  images: string[];
  specs: PropertySpecs;
  amenities: string[];
  status: "available" | "pending" | "sold" | "rented";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  category?: "sale" | "rent" | "all";
  propertyType?: Property["propertyType"] | "all";
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minSquareMeters?: number;
  maxSquareMeters?: number;
  amenities?: string[];
  location?: string;
}
