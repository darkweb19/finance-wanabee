"use client";

import useSWR from "swr";
import { deleteUser } from "./util";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const getUsers = async () => {
	const users = await fetch(
		"https://finance-wanabee.vercel.app/api/user/get",
		{
			cache: "no-store",
			next: {
				tags: ["user"],
			},
		}
	);
	const user = await users.json();
	return user;
};

export default function User() {
	const { data, error, mutate } = useSWR(
		"https://finance-wanabee.vercel.app/api/user/get",
		getUsers,
		{
			revalidateOnFocus: true,
			revalidateOnReconnect: true,
			revalidateOnMount: true,
		}
	);

	const handleDelete = async (id: string) => {
		const result = await deleteUser(id);

		if (result.success) {
			toast.success(result.message);
			mutate("https://finance-wanabee.vercel.app/api/user/get");
		} else {
			toast.error(result.message);
		}
	};

	return (
		<main className="h-screen border border-black p-4 flex flex-col gap-10 justify-center items-center">
			<div>lists</div>

			<Table>
				<TableHeader>
					<TableHead>SN</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Age</TableHead>
					<TableHead>Balance</TableHead>
					<TableHead>Gender</TableHead>
					<TableHead>Action</TableHead>
				</TableHeader>
				<TableBody>
					{Array.isArray(data) && data.length > 0 ? (
						data.map((item: User, index: number) => (
							<TableRow key={index}>
								<TableCell> {index + 1}</TableCell>

								<TableCell>{item.name} </TableCell>
								<TableCell>{item.email} </TableCell>
								<TableCell>{item.age} </TableCell>
								<TableCell>${item.balance} </TableCell>
								<TableCell>{item.gender} </TableCell>
								<Button onClick={() => handleDelete(item.id)}>
									{" "}
									Delete{" "}
								</Button>
							</TableRow>
						))
					) : (
						<Button>No users available</Button>
					)}
				</TableBody>
			</Table>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="/" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</main>
	);
}
