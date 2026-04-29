// models/Property.ts
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      ge: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      ge: { type: String, required: true },
      en: { type: String, required: true },
    },
    price: {
      gel: { type: Number, required: true }, 
      usd: { type: Number, required: true }, 
    },
    category: { type: String, enum: ["sale", "rent"], required: true },
    propertyType: {
      type: String,
      enum: [
        "apartment",
        "house",
        "villa",
        "penthouse",
        "land",
        "commercial",
        "hotel",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "pending", "sold", "rented"],
      default: "available",
    },
    featured: { type: Boolean, default: false },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String },
      country: { type: String, default: "საქართველო" },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    specs: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      squareMeters: { type: Number, required: true },
      floor: Number,
      totalFloors: Number,
      yearBuilt: Number,
      parking: Number,
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
