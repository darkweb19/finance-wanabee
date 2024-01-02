import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	return NextResponse.json({ success: true, message: "Hello from API" });
}

export async function POST(req: NextRequest) {
	try {
		const { name, amount, tags } = await req.json();

		const finance = await prisma.finance.create({
			data: {
				name: name,
				amount: amount,
				tags: tags,
			},
		});

		console.log("Finance added to the database : ", finance);
		return NextResponse.json({ success: true });
	} catch (err: any) {
		console.log("error while adding finance to the database ", err);
		return NextResponse.json({ success: false, err: err });
	}
}
