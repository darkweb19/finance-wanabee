"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/prisma/Prisma";

const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodApiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : prodApiUrl;
const URL = `${apiUrl}/api/finance`;

export default function FinanceManager() {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState<number>();
	const [tags, setTags] = useState("");
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState(
		"bc26f563-1939-41f1-b232-7e587c503b72"
	);
	// const currentUser = useCurrentUser();
	// console.log(currentUser);

	async function createFinance(e: any) {
		try {
			setLoading(true);
			e.preventDefault();
			if (name == "" || amount == undefined) {
				toast.error("name cannot be empty");
				return;
			}
			const finance = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, amount, tags, userId }),
			});
			const res = await finance.json();
			if (res.success) {
				setName("");
				setAmount(0);
				setTags("");
				toast.success("Finance added ");
			}
		} catch (err) {
			console.log("Error on client while creating finance");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className=" p-4 h-dvh sm:h-screen  flex gap-4 flex-col items-center justify-center">
			<span className="text-2xl font-semibold">Add Expenses:</span>
			<form
				action=""
				className="p-5 rounded-lg  sm:w-2/6 shadow-xl"
				onSubmit={createFinance}
			>
				<Input
					type="text"
					name="name"
					className="mt-3"
					required
					value={name}
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					type="number"
					name="amount"
					className="mt-3"
					value={amount}
					required
					placeholder="amount"
					onChange={(e) => setAmount(parseInt(e.target.value))}
				/>
				<Input
					type="text"
					name="tag"
					value={tags}
					className="mt-3"
					placeholder="Tags"
					onChange={(e) => setTags(e.target.value)}
				/>

				{loading ? (
					<Button disabled>
						<ReloadIcon className="mr-2 h-4 w-4 mt-3 animate-spin" />
						Adding
					</Button>
				) : (
					<Button className="mt-3" type="submit">
						Add
					</Button>
				)}
			</form>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="/" />
					</PaginationItem>

					<PaginationItem>
						<Link
							className="p-2 rounded-lg border border-black"
							href={"/finance/list"}
						>
							Lists
						</Link>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
