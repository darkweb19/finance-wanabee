"use client";

import { useState } from "react";

export default function UserCreate() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [created, setCreated] = useState(false);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			const user = await fetch(
				"https://finance-wanabee.vercel.app//api/user/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email }),
				}
			);
			console.log("user created in db");
			setName("");
			setEmail("");
			setCreated(true);
			setTimeout(() => {
				setCreated(false);
			}, 1000);

			console.log(user);
		} catch (err) {
			console.log("database creation failed for user in client");
		}
	}
	return (
		<div className="flex border text-black h-screen">
			<form
				action=""
				onSubmit={submit}
				className="border flex gap-2 flex-col h-fit p-3"
			>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					name="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				{name.length == 0 ? (
					<button className="text-white" type="submit" disabled>
						Add
					</button>
				) : (
					<button className="text-white" type="submit">
						Add
					</button>
				)}
				{created && <div className="text-white"> User Created</div>}
			</form>
		</div>
	);
}
