import Lesson from "@/lib/models/Lesson";
import { connectToDB } from "@/lib/mongoose";
import { verifyAdminToken } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {

      const isAdmin = verifyAdminToken(_);
    
      if (!isAdmin) {
        return new Response("Forbidden", { status: 403 });
      }
    const  moduleId  = (await params).moduleId;

    await connectToDB();

    // Delete all lessons where moduleId === param
    const result = await Lesson.deleteMany({ moduleId });

    return NextResponse.json(
      {
        message: "All lessons deleted for this module",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /lessons/module/[moduleId] ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete lessons by moduleId" },
      { status: 500 }
    );
  }
}
