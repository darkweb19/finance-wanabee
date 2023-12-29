"use client";
import Link from "next/link";
import UserList from "./UserList";
import useSWR from "swr";

const getUsers = async () => {
	const users = await fetch("http://localhost:3000/api/user/get", {
		cache: "no-store",
		next: {
			tags: ["user"],
		},
	});
	const user = await users.json();
	return user;
};

export default function User() {
	const { data, error } = useSWR(
		"http://localhost:3000/api/user/get",
		getUsers,
		{
			revalidateOnMount: true,
		}
	);

	return (
		<main className="h-screen flex flex-col gap-10 justify-center items-center">
			<div>lists</div>
			{data && <UserList user={data} />}
			<Link className="border p-2" href="/">
				back
			</Link>
		</main>
	);
}
