"use server";

import prisma from "@/prisma/Prisma";

export async function deleteFinance(id: string) {
	try {
		const finance = await prisma.finance.delete({ where: { id } });
		return { success: true, message: "User deleted" };
	} catch (err: any) {
		console.log("User deletion failed", err.message);
	}
}
