import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const userId = req.nextUrl.searchParams.get("userid");

		const data = await prisma.user.findUnique({
			where: {
				id: userId as string,
			},
			include: {
				finances: true,
			},
		});
		//this is for not having data
		if (!data) {
			return NextResponse.json({ success: true, data: null });
		}
		return NextResponse.json({ success: true, data: data.finances });
	} catch (err: any) {
		console.log("Cannot fetch data finance", err.message);
	}
}
