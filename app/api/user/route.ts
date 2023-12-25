import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const user = await prisma.user.findUnique({
			where: { email: "sujansthadev@gmail.com" },
		});
		return NextResponse.json(user);
	} catch (err) {
		console.log("getting user failed");
	}
}
