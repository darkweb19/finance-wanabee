import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { name, email, balance } = await req.json();

		if (!name || !email) {
			throw new Error("Cannot add empty in db");
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				balance,
			},
		});

		console.log(`user added to database : ${user}`);
		return NextResponse.json({ ok: true });
	} catch (err: any) {
		console.log("error in creating user", err);
		return NextResponse.json({ ok: false, message: err.message });
	}
}
