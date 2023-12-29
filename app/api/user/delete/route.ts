import prisma from "@/prisma/Prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get("id");

		const user: User = await prisma.user.delete({
			where: { id: id as string },
		});
		revalidatePath("/user/get");
		return NextResponse.json({
			success: true,
			message: "Deleted successfully",
		});
	} catch (err: any) {
		console.log(err.message);
	}
}
