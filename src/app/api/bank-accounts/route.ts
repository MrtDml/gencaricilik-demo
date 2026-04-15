import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const accounts = await prisma.bankAccount.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, bankName: true, accountName: true, iban: true, branch: true },
  });
  return NextResponse.json(accounts);
}
