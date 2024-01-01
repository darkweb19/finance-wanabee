"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserCreate() {
	const [name, setName] = useState("");
	const [balance, setBalance] = useState(Number);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [weight, setWeight] = useState(Number);
	const [age, setAge] = useState(Number);
	const [gender, setGender] = useState("");
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
					body: JSON.stringify({
						name,
						email,
						balance,
						gender,
						age,
						weight,
						username,
					}),
				}
			);

			const userData = await userResponse.json();
			if (userData.ok) {
				setName("");
				setEmail("");
				setBalance(0);
				setAge(0);
				setGender("");
				setUsername("");
				setWeight(0);
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
		<div className="flex justify-center items-center text-black h-screen overflow-scroll">
			<form
				action=""
				onSubmit={submit}
				className="border flex gap-1 flex-col h-fit p-10 "
			>
				<span>Name</span>
				<Input
					type="text"
					name="name"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<span>Balance</span>
				<Input
					type="number"
					name="balance"
					placeholder="balance"
					value={balance}
					onChange={(e) => setBalance(parseInt(e.target.value))}
				/>
				<span>Username</span>
				<Input
					type="username"
					name="username"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<span>Email</span>
				<Input
					type="text"
					name="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<span>Gender</span>
				<Input
					type="text"
					name="gender"
					placeholder="gender"
					value={gender}
					onChange={(e) => setGender(e.target.value)}
				/>
				<span>age</span>
				<Input
					type="number"
					name="age"
					placeholder="age"
					value={age}
					onChange={(e) => setAge(parseInt(e.target.value))}
				/>
				<span>weight</span>
				<Input
					type="number"
					name="weight"
					placeholder="weight"
					value={weight}
					onChange={(e) => setWeight(parseInt(e.target.value))}
				/>

				{email.length == 0 ? (
					<Button
						className="text-white border rounded-md"
						type="submit"
						disabled
					>
						Add
					</Button>
				) : (
					<Button
						className="text-white border rounded-md"
						type="submit"
					>
						{buttonLoading ? "Adding..." : "Add"}
					</Button>
				)}
				<Link
					href="/"
					className="border rounded-md p-2 w-fit text-black"
				>
					back
				</Link>
			</form>
		</div>
	);
}
