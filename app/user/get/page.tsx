import Link from "next/link";
import UserList from "./UserList";

async function getUsers() {
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
}

export default async function User() {
	const user = await getUsers();

	return (
		<main className="h-screen flex flex-col gap-10 justify-center items-center">
			<div>lists</div>

			<UserList user={user} />
			<Link className="border p-2" href="/">
				back
			</Link>
		</main>
	);
}
