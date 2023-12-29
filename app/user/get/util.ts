"use server";
import prisma from "@/prisma/Prisma";

export async function deleteUser(id: string) {
	try {
		const user = await prisma.user.delete({
			where: {
				id,
			},
		});
		return { success: true, message: `Deleted ${user.name} ` };
	} catch (err: any) {
		console.log("error while deleting user", err.message);
		return { success: false, message: err.message };
	}
}
