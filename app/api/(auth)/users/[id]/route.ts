import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

// GET /api/users/:clerkId
export async function GET(_: Request, { params }: { params: { id: string } }
) {
  await connectToDB();
  const id = (await params).id;

  const user = await User.findOne({ clerkId: id });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

// PUT /api/users/:clerkId
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const { id } = await context.params;
  const data = await req.json();

  const user = await User.findOneAndUpdate(
    { clerkId: id },
    data,
    { new: true }
  );

  return NextResponse.json(user, { status: 200 });
}

// DELETE /api/users/:clerkId
export async function DELETE(_: Request, { params }: { params: { id: string }}
) {
  await connectToDB();
const id = (await params).id;

  await User.findOneAndDelete({ clerkId: id });

  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
