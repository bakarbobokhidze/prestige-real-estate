import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const query: any = {};

    const city = searchParams.get("city");
    if (city && city !== "all") {
      query.city = { $regex: new RegExp(`^${city}$`, "i") };
    }

    const category = searchParams.get("category");
    if (category && category !== "all") {
      query.category = category;
    }

    const propertyType = searchParams.get("propertyType");
    if (propertyType && propertyType !== "all") {
      query.propertyType = propertyType;
    }

    const location = searchParams.get("location");
    if (location) {
      query.$or = [
        { city: { $regex: new RegExp(location, "i") } },
        { address: { $regex: new RegExp(location, "i") } },
      ];
    }

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });
    return NextResponse.json(properties);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newProperty = await Property.create(body);
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
