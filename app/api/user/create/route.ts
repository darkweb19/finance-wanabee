import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const user = await prisma.user.create({
			data: {
				name: "Sujan Shrestha",
				email: "sujansthadev@gmail.com",
			},
		});
		console.log(`user added to database : ${user}`);
		return NextResponse.json(user);
	} catch (err) {
		console.log("error in creating user", err);
		return NextResponse.json({
			error: "database error : Failed to create a user",
		});
	}
}
