import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoose";

import { NextResponse } from "next/server";


export async function GET(_req: Request, { params }: any) {
  await connectToDB();

  const user = await User.findById(params.id);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}


export async function PUT(req: Request, { params }: any) {
  await connectToDB()
  const data = await req.json();

  const user = await User.findByIdAndUpdate(params.id, data, { new: true });

  return NextResponse.json(user);
}


export async function DELETE(_req: Request, { params }: any) {
  await connectToDB()

  await User.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "User deleted" });
}
