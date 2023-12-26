import Link from "next/link";

async function getUsers() {
	const users = await fetch(
		"https://finance-wanabee.vercel.app/api/user/get",
		{
			cache: "no-store",
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
			<ul>
				{user.map((item: any, index: number) => (
					<li key={index}>
						{" "}
						sn :({index + 1}) {item.name}{" "}
					</li>
				))}
			</ul>
			<Link className="border p-2" href="/">
				back
			</Link>
		</main>
	);
}
