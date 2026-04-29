import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || MONGODB_URI.includes("<password>")) {
  throw new Error("გთხოვთ ჩაწეროთ სწორი პაროლი MONGODB_URI-ში");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    console.log("მცდელობა: ვუკავშირდებით MongoDB-ს...");

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ წარმატება: ბაზა დაკავშირებულია!");
        return mongoose;
      })
      .catch((e) => {
        console.error("❌ შეცდომა დაკავშირებისას:", e.message);
        throw e;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
