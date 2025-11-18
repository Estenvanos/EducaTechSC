import mongoose from "mongoose";
const uri = "mongodb+srv://estevan:qlsL9wrLEXXuxjxo@educatech.yjliltn.mongodb.net/?appName=educaTech"
let isConnected = false; 

export const connectToDB = async () => {
  if (isConnected) {
    return;
  }

  if (!uri){
    throw new Error("Missing MONGODB_URI environment variable");
  }

  try {
    const db = await mongoose.connect(uri,{
      dbName: "educaTech",
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
