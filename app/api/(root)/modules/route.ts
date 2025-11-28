import Module from "@/lib/models/Module";
import { connectToDB } from "@/lib/mongoose";
import { verifyAdminToken } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await connectToDB();

    const modules = await Module.find().lean();
    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    console.error("GET /modules ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
      const isAdmin = verifyAdminToken(request);
    
      if (!isAdmin) {
        return new Response("Forbidden", { status: 403 });
      }
    await connectToDB();

    const { title, category } = await request.json();

    if (!title || !category) {
      return NextResponse.json(
        { error: "title and category are required" },
        { status: 400 }
      );
    }

    const newModule = await Module.create({ title, category });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    console.error("POST /modules ERROR:", error);
    return NextResponse.json({ error: "Failed to create module" }, { status: 500 });
  }
}
