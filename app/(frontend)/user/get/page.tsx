"use client";
import Link from "next/link";
import useSWR from "swr";
import { deleteUser } from "./util";
import toast from "react-hot-toast";

const getUsers = async () => {
	const users = await fetch(
		"https://finance-wanabee.vercel.app/api/user/get",
		{
			cache: "no-store",
			next: {
				tags: ["user"],
			},
		}
	);
	const user = await users.json();
	return user;
};

export default function User() {
	const { data, error, mutate } = useSWR(
		"https://finance-wanabee.vercel.app/api/user/get",
		getUsers,
		{
			revalidateOnFocus: true,
			revalidateOnReconnect: true,
			revalidateOnMount: true,
		}
	);

	const handleDelete = async (id: string) => {
		const result = await deleteUser(id);

		if (result.success) {
			toast.success(result.message);
			mutate("https://finance-wanabee.vercel.app/api/user/get");
		} else {
			toast.error(result.message);
		}
	};

	return (
		<main className="h-screen flex flex-col gap-10 justify-center items-center">
			<div>lists</div>

			<ul>
				{Array.isArray(data) && data.length > 0 ? (
					data.map((item: any, index: number) => (
						<li key={index}>
							sn :({index + 1})
							<Link href={`/user/get/balance/${item.id}`}>
								{item.name}{" "}
							</Link>
							<button onClick={() => handleDelete(item.id)}>
								Delete
							</button>
						</li>
					))
				) : (
					<li>No users available</li>
				)}
			</ul>

			<Link className="border p-2" href="/">
				back
			</Link>
		</main>
	);
}
