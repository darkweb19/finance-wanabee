"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchUser() {
	const [name, setName] = useState("");
	const [user, setUser] = useState<User>(Object);

	async function handleSearch() {
		if (name == "" || name.length <= 0) {
			toast.error("cannot be empty");
			console.log("no search");
			return;
		}

		const searchUser = await fetch(
			`https://finance-wanabee.vercel.app/api/user/search?name=${name}`
		);

		const resUser = await searchUser.json();

		if (!resUser.success) {
			toast.error("Cannnot found the user in the db");
		} else {
			setUser(resUser.user[0]);
			toast.success("user found");
		}
	}

	return (
		<div className=" h-screen flex gap-3 flex-col items-center justify-center">
			<div className=" flex flex-col w-[50%] gap-3 items-center">
				<Input
					className="text-black p-1 rounded-lg"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button
					className="border rounded-lg p-2"
					onClick={() => handleSearch()}
				>
					Search
				</Button>
			</div>

			<div className="border flex flex-col rounded-md p-3 items-center">
				<ul className="flex flex-col gap-2">
					{user != undefined && user.email ? (
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
					) : (
						"no data"
					)}{" "}
				</ul>
			</div>
		</div>
	);
}
