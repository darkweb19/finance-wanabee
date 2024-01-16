"use server";

import prisma from "@/prisma/Prisma";
import { getSession } from "next-auth/react";

export async function getUser(email: string) {
	const session = await getSession();
	console.log("session", session);
	try {
		const user = await prisma.user.findUnique({
			where: { email: email },
		});
		console.log("user", user);
		return user;
	} catch (error) {
		console.error("Error fetching user:", error);
	}
}
