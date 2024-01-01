import Link from "next/link";

export default function Home() {
	return (
		<main className="text-center h-screen flex flex-col justify-center items-center gap-10">
			<p>Finance Wanabee</p>
			<div className="flex gap-6">
				<Link href="/user/create">Create users</Link>
				<Link href="/user/get">Get users</Link>
				<Link href="/user/get/search">Search User</Link>
			</div>
		</main>
	);
}
