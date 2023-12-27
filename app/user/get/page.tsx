"use client";
import Link from "next/link";
import UserList from "./UserList";
import useSWR from "swr";

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
	const { data, error } = useSWR("key", getUsers);

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
