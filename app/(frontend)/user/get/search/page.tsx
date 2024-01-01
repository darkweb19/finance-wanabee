"use client";
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
				<input
					className="text-black p-1 rounded-lg"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button
					className="border rounded-lg p-2"
					onClick={() => handleSearch()}
				>
					Search
				</button>
			</div>

			<div className="border flex flex-col rounded-md p-3 items-center">
				<ul className="flex flex-col gap-2">
					{user != undefined && user.email ? (
						<>
							<li>Name : {user.name}</li>
							<li>Age : {user.age}</li>
							<li>Email : {user.email}</li>
							<li>Gender : {user.gender}</li>
							<li>UserName : {user.username}</li>
							<li>Weight : {user.weight}</li>
						</>
					) : (
						"no data"
					)}{" "}
				</ul>
			</div>
		</div>
	);
}
