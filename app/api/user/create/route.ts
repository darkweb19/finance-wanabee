import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { name, email } = await req.json();

		if (!name || !email) {
			throw new Error("Cannot add empty in db");
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
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
