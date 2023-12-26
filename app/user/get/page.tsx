import Link from "next/link";

export default function getUsers() {
	return (
		<main className="h-screen flex gap-10 justify-center items-center">
			<div>lists</div>
			<Link className="border p-2" href="/">
				back
			</Link>
		</main>
	);
}
