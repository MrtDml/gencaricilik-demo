import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { productsData } from "@/data/products";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

// Statik ürün listesini döner - tam sürümde DB'den gelecek
export async function GET() {
  return NextResponse.json(productsData);
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  // Tam sürümde Prisma DB'ye kayıt yapılacak
  const body = await request.json();
  return NextResponse.json(
    { message: "Ürün eklendi (tam sürümde DB kaydı yapılacak)", product: body },
    { status: 201 }
  );
}
