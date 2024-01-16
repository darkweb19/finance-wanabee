"use server";

import prisma from "@/prisma/Prisma";

export async function getUser(email: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { email: email },
		});

		return user;
	} catch (error) {
		console.error("Error fetching user:", error);
	}
}
