"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodApiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : prodApiUrl;

export default function SearchUser() {
	const [name, setName] = useState(String);
	const [user, setUser] = useState<User>(Object);

	async function handleSearch(eName: string) {
		if (eName == " " || eName.length <= 0) {
			toast.error("cannot be empty");
			return;
		}

		const searchUser = await fetch(
			`${apiUrl}/api/user/search?name=${eName}`
		);

		const resUser = await searchUser.json();

		if (!resUser.success) {
			toast.error("Cannnot found the user in the db");
		} else {
			setUser(resUser.user[0]);
			toast.success("user found");
		}
	}

	async function handleChange(eName: string) {
		setName(eName);

		handleSearch(eName);
	}
	return (
		<div className=" h-screen flex gap-3 flex-col items-center justify-center">
			<div className=" flex flex-col w-[50%] gap-3 items-center">
				<Input
					className="text-black p-1 rounded-lg"
					type="text"
					placeholder="enter name"
					value={name}
					onChange={(e) => handleChange(e.target.value)}
				/>
				<Button
					className="border rounded-lg p-2"
					onClick={() => handleSearch(name)}
				>
					Search
				</Button>
			</div>

			{user != undefined && user.id && (
				<div className="border flex flex-col rounded-md p-3 items-center">
					<>
						<Card className={cn("w-[380px] text-start")}>
							<CardHeader>
								<CardTitle> {user.name} </CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col items-start ml-7">
								<p>email : {user.email}</p>
								<p>UserName : {user.username}</p>
								<p>Gender : {user.gender}</p>
								<p>Weight : {user.weight}</p>
								<p>Age : {user.age}</p>
							</CardContent>
						</Card>
					</>
				</div>
			)}
		</div>
	);
}
