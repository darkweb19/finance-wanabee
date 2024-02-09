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

export async function POST(req: NextRequest) {
	try {
		const { name, amount, tags, userId } = await req.json();

		const finance = await prisma.finance.create({
			data: {
				name: name,
				amount: amount,
				tags: tags,
				author: {
					connect: { id: userId },
				},
			},
		});

		console.log("Finance added to the database : ", finance);
		return NextResponse.json({ success: true });
	} catch (err: any) {
		console.log("error while adding finance to the database ", err);
		return NextResponse.json({ success: false, err: err });
	}
}
