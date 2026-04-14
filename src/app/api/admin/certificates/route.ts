import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return false;
  }
  return true;
}

export async function GET() {
  try {
    const certs = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(certs);
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  try {
    const { title, imageUrl } = await request.json();
    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Başlık ve görsel URL gerekli" }, { status: 400 });
    }
    const cert = await prisma.certificate.create({ data: { title, imageUrl } });
    return NextResponse.json(cert, { status: 201 });
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
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
