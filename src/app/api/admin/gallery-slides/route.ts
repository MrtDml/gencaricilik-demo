import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

export async function GET() {
  try {
    const slides = await prisma.gallerySlide.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const { imageUrl, title, caption } = await request.json();
    if (!imageUrl) {
      return NextResponse.json({ error: "Görsel URL gerekli" }, { status: 400 });
    }
    const count = await prisma.gallerySlide.count();
    const slide = await prisma.gallerySlide.create({
      data: { imageUrl, title: title || "", caption: caption || "", order: count },
    });
    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const { id, title, caption, order, isActive } = await request.json();
    if (!id) return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    const slide = await prisma.gallerySlide.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(caption !== undefined && { caption }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    await prisma.gallerySlide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
