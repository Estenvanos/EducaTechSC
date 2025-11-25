import Lesson from "@/lib/models/Lesson";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { params } = context;
    const { id } = await params; // ⬅ unwrap the params promise

    await connectToDB();

    const lesson = await Lesson.findById(id).populate("moduleId").lean();

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(lesson, { status: 200 });
  } catch (error) {
    console.error("GET /lessons/[id] ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch lesson" }, { status: 500 });
  }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    const data = await request.json();

    const updatedLesson = await Lesson.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedLesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLesson, { status: 200 });
  } catch (error) {
    console.error("PUT /lessons/[id] ERROR:", error);
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}

// DELETE → Remover a lesson
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    const deletedLesson = await Lesson.findByIdAndDelete(params.id);

    if (!deletedLesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Lesson deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /lessons/[id] ERROR:", error);
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDB();

    const { id } = await context.params;
    const { lessonUpdate } = await request.json();
    
    const incObject: any = {};
    if (lessonUpdate.likes) incObject.likes = lessonUpdate.likes;
    if (lessonUpdate.dislikes) incObject.dislikes = lessonUpdate.dislikes;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { $inc: incObject },
      { new: true }
    );

    return NextResponse.json(updatedLesson, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}
