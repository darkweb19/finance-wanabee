"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserCreate() {
	const [name, setName] = useState("");
	const [balance, setBalance] = useState(0);
	const [email, setEmail] = useState("");
	const [buttonLoading, setButtonLoading] = useState(false);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		try {
			setButtonLoading(true);
			e.preventDefault();

			const userResponse = await fetch(
				"https://finance-wanabee.vercel.app/api/user/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, balance }),
				}
			);

			const userData = await userResponse.json();
			if (userData.ok) {
				setName("");
				setEmail("");
				setBalance(0);
				toast.success("user created");
				console.log("Database added");
				setButtonLoading(false);
			} else {
				setName("");
				setBalance(0);
				toast.error(userData.message);
				setButtonLoading(false);
				console.log("Error in db :", userData.message);
			}
		} catch (err) {
			setButtonLoading(true);
			console.log("database creation failed for user in client");
		}
	}
	return (
		<div className="flex justify-center items-center text-black h-screen">
			<form
				action=""
				onSubmit={submit}
				className="border flex gap-5 flex-col h-fit p-10 "
			>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="number"
					name="balance"
					placeholder="balance"
					value={balance}
					onChange={(e) => setBalance(parseInt(e.target.value))}
				/>
				<input
					type="text"
					name="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				{email.length == 0 ? (
					<button
						className="text-white border rounded-md"
						type="submit"
						disabled
					>
						Add
					</button>
				) : (
					<button
						className="text-white border rounded-md"
						type="submit"
					>
						{buttonLoading ? "Adding..." : "Add"}
					</button>
				)}
				<Link href="/" className="border p-2 w-fit text-white">
					back
				</Link>
			</form>
			<Toaster />
		</div>
	);
}
