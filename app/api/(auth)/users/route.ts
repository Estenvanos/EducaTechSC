import { NextResponse } from "next/server";

import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs/server";


export async function GET() {
  await connectToDB();

  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { clerkId, fullName, email } = await request.json();

    console.log("BACKEND RECEIVED:", { clerkId, fullName, email });

    if (!clerkId || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let existingUser = await User.findOne({ clerkId });

    if (!existingUser) {
      existingUser = await User.create({ clerkId, fullName, email });
    }

    return Response.json(existingUser, { status: 200 });

  } catch (error) {
    console.error("API ERROR /api/users", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
