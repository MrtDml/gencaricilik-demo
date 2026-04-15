import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const accounts = await prisma.bankAccount.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(accounts);
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { bankName, accountName, iban, branch, order } = await req.json();
  if (!bankName || !accountName || !iban) {
    return NextResponse.json({ error: "Banka adı, hesap sahibi ve IBAN zorunludur." }, { status: 400 });
  }

  const account = await prisma.bankAccount.create({
    data: { bankName, accountName, iban, branch: branch || null, order: order ?? 0, isActive: true },
  });
  return NextResponse.json(account, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id, bankName, accountName, iban, branch, isActive, order } = await req.json();
  if (!id) return NextResponse.json({ error: "ID gerekli." }, { status: 400 });

  const account = await prisma.bankAccount.update({
    where: { id },
    data: { bankName, accountName, iban, branch: branch || null, isActive, order },
  });
  return NextResponse.json(account);
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID gerekli." }, { status: 400 });

  await prisma.bankAccount.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
