import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const dynamicParams = false;
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";
export const preferredRegion = "auto";

export async function GET(req: NextRequest) {
	try {
		const searchName = req.nextUrl.searchParams.get("name");
		const user = await prisma.user.findMany({
			where: { name: searchName },
		});

		if (user.length == 0) {
			return NextResponse.json({ null: "nothing is found" });
		}

		return NextResponse.json(user);
	} catch (err) {
		console.log("getting user failed");
		return NextResponse.json({
			error: "database error : Failed to get  user",
		});
	}
}