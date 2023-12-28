"use server";
import prisma from "@/prisma/Prisma";

export async function deleteUser(id: string) {
	try {
		await prisma.user.delete({ where: { id: id } });
		return { success: true, message: "User Deleted Successfully" };
	} catch (err: any) {
		console.log("error while deleting user", err.message);
		return { success: false, message: err.message };
	}
}
