import Lesson from "@/lib/models/Lesson";
import "@/lib/models/Module";
import { connectToDB } from "@/lib/mongoose";
import { verifyAdminToken } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const lessons = await Lesson.find().populate("moduleId").lean();

    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error("GET /lessons ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = verifyAdminToken(request);

    if (!isAdmin) {
      return new Response("Forbidden", { status: 403 });
    }
    await connectToDB();

    const { title, videoUrl, moduleId } = await request.json();

    if (!title || !videoUrl || !moduleId) {
      return NextResponse.json(
        { error: "title, videoUrl and moduleId are required" },
        { status: 400 }
      );
    }

    const newLesson = await Lesson.create({ title, videoUrl, moduleId });

    return NextResponse.json(newLesson, { status: 201 });
  } catch (error) {
    console.error("POST /lessons ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}
