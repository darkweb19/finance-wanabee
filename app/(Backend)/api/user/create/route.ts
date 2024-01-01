import prisma from "@/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

async function dataMigration() {
	const fetchData = async () => {
		const response = await fetch(
			"https://dummyjson.com/users?limit=50&select=firstName,email,age,gender,username,weight"
		);
		const data = await response.json();
		return data;
	};

	const userData = await fetchData();
	console.log(userData.users[0]);
	const insertData = async () => {
		for (const user of userData.users) {
			await prisma.user.create({
				data: {
					name: user.firstName,
					email: user.email,
					balance: user.id,
					username: user.username,
					age: user.age,
					gender: user.gender,
					weight: user.weight,
				},
			});
		}
	};
	insertData();
	console.log("data migrated");
}

export async function POST(req: NextRequest) {
	try {
		const { name, email, balance } = await req.json();
		// dataMigration();
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
