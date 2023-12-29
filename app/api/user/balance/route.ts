import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get("id");

		const balance = await prisma.user.findUnique({
			where: {
				id: id as string,
			},
		});
		console.log("balance is :", balance);
		return NextResponse.json({ success: true, balance: balance });
	} catch (err: any) {
		console.log(err);
		return NextResponse.json({
			success: false,
			balance: "Not found :",
			error: err.message,
		});
	}
}
