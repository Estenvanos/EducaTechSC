import Module from "@/lib/models/Module";
import { connectToDB } from "@/lib/mongoose";
import { verifyAdminToken } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const id = (await params).id;

    const moduleItem = await Module.findById(id).lean();

    if (!moduleItem) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    return NextResponse.json(moduleItem, { status: 200 });
  } catch (error) {
    console.error("GET /modules/:id ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch module" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = verifyAdminToken(request);

    if (!isAdmin) {
      return new Response("Forbidden", { status: 403 });
    }
    await connectToDB();
    const id = (await params).id;

    const body = await request.json();
    const updated = await Module.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /modules/:id ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update module" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = verifyAdminToken(_);

    if (!isAdmin) {
      return new Response("Forbidden", { status: 403 });
    }
    await connectToDB();
    const id = (await params).id;
    const deleted = await Module.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Module deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /modules/:id ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete module" },
      { status: 500 }
    );
  }
}
