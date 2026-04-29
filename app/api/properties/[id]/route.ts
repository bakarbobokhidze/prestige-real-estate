import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

// 1. ერთი კონკრეტული ქონების წამოღება ID-ით
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "ქონება ვერ მოიძებნა" },
        { status: 404 },
      );
    }

    return NextResponse.json(property);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. ქონების რედაქტირება (Update)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: body },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "განახლება ვერ მოხერხდა, ID არასწორია" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedProperty);
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. ქონების წაშლა (Delete)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return NextResponse.json(
        { error: "ქონება ვერ მოიძებნა" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "ქონება წარმატებით წაიშალა" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
