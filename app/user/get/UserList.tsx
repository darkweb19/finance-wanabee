"use client";
import toast from "react-hot-toast";
import { deleteUser } from "./util";
import Link from "next/link";
import { User } from "@prisma/client";

export default function UserList({ user }: { user: User[] }) {
	const handleDelete = async (id: string) => {
		const result = await deleteUser(id);

		if (result.success) {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}
	};
	return (
		<ul>
			{user.map((item: any, index: number) => (
				<li key={index}>
					{" "}
					sn :({index + 1})
					<Link href={`/user/get/balance/${item.id} `}>
						{item.name}{" "}
					</Link>
					<button onClick={() => handleDelete(item.id)}>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
}
