import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoose";

export async function GET() {
  await connectToDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { clerkId, fullName, email } = await request.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    const newUser = await User.create({ clerkId, fullName, email });
    

    return NextResponse.json(newUser);

  } catch (error) {
    console.error("API ERROR /api/users", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
