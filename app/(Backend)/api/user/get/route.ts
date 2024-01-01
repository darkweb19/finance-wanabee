import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	const users = await prisma.user.findMany();
	return NextResponse.json(users);
}
