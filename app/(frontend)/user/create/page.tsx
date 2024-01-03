"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
	name: string;
	balance: number;
	email: string;
	username: string;
	weight: number;
	age: number;
	gender: string;
}

const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodApiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : prodApiUrl;
const URL = `${apiUrl}/api/user/create`;

export default function UserCreate() {
	const initialFormData: FormData = {
		name: "",
		balance: 0,
		email: "",
		username: "",
		weight: 0,
		age: 0,
		gender: "",
	};

	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [buttonLoading, setButtonLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "number" ? parseInt(value) : value,
		}));
	};

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			setButtonLoading(true);
			e.preventDefault();

			const userResponse = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const userData = await userResponse.json();
			if (userData.ok) {
				setFormData(initialFormData);
				toast.success("User created");
				console.log("Database added");
			} else {
				toast.error(userData.message);
				console.log("Error in db :", userData.message);
			}
		} catch (err) {
			console.error("Database creation failed for user in client");
		} finally {
			setButtonLoading(false);
		}
	};

	return (
		<div className="h-dvh sm:h-screen flex justify-center items-center text-black overflow-scroll">
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
					value={formData.name}
					onChange={handleChange}
				/>
				<span>Balance</span>
				<Input
					type="number"
					name="balance"
					placeholder="balance"
					value={formData.balance}
					onChange={handleChange}
				/>
				<span>Username</span>
				<Input
					type="username"
					name="username"
					placeholder="username"
					value={formData.username}
					onChange={handleChange}
				/>
				<span>Email</span>
				<Input
					type="text"
					name="email"
					placeholder="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<span>Gender</span>
				<Input
					type="text"
					name="gender"
					placeholder="gender"
					value={formData.gender}
					onChange={handleChange}
				/>
				<span>age</span>
				<Input
					type="number"
					name="age"
					placeholder="age"
					value={formData.age}
					onChange={handleChange}
				/>
				<span>weight</span>
				<Input
					type="number"
					name="weight"
					placeholder="weight"
					value={formData.weight}
					onChange={handleChange}
				/>

				{/* Submit button */}
				<Button
					className="text-white border rounded-md"
					type="submit"
					disabled={formData.email.length === 0 || buttonLoading}
				>
					{buttonLoading ? "Adding..." : "Add"}
				</Button>

				{/* Back link */}
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
