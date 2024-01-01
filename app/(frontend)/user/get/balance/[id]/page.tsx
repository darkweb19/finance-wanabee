import prisma from "@/prisma/Prisma";
import { User } from "@prisma/client";

export default async function ({ params }: { params: { id: string } }) {
	const id = params.id;
	const user: User | null = await prisma.user.findUnique({ where: { id } });

	return <div>balance = {user?.balance}</div>;
}
