"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Finance } from "@prisma/client";
import useSWR from "swr";
import { TableSkeleton } from "./TableSkeleton";
import { deleteFinance } from "./utils";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodApiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : prodApiUrl;
const URL = `${apiUrl}/api/finance`;

const getFinanceData = async () => {
	const data = await fetch(URL, { cache: "no-store" });
	const dataFinance = await data.json();
	if (dataFinance.data == null) {
		toast.error("There is no data");
		return [];
	}
	return dataFinance.data;
};

export default function FinanceList() {
	const [deleting, setDeleting] = useState(false);
	const [deletingItemId, setDeletingItemId] = useState("");
	const { data, error, mutate } = useSWR(URL, getFinanceData);

	const [sum, setSum] = useState(0);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	function handleSumAmount() {
		let amountSum = 0;
		if (selectedItems.length === 0) {
			toast.error("please check first");
		}
		data.forEach((item: any) =>
			selectedItems.includes(item.id)
				? setSum((amountSum = amountSum + item.amount)) // Increase by pre amount
				: null
		);
	}

	function selectAll(check: boolean) {
		data.forEach((item: any) =>
			setSelectedItems((prevCheck) =>
				check
					? [...prevCheck, item.id]
					: prevCheck.filter((id) => id !== item.id)
			)
		);
	}
	async function handleDelete(id: string) {
		setDeleting(true);
		setDeletingItemId(id);
		setSum(0);
		await deleteFinance(id);
		mutate(URL);
		setDeleting(false);
	}

	return (
		<main className="h-dvh sm:h-screen p-3 w-full flex flex-col gap-3 items-center justify-center">
			<h1 className="text-3xl font-semibold">All Expenses :</h1>
			<div className="p-4 sm:p-3 w-full sm:w-4/6 rounded-md shadow-lg h-fit overflow-scroll">
				<Table>
					{Array.isArray(data) && data.length > 0 && (
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									<Checkbox
										onCheckedChange={(check) =>
											selectAll(check as boolean)
										}
									/>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Tags</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
					)}
					<TableBody>
						{Array.isArray(data) && data.length == 0 ? (
							<p className="text-center">Database is empty</p>
						) : Array.isArray(data) && data.length > 0 ? (
							data.map((item: Finance, index) => (
								<TableRow key={index}>
									<TableCell>
										<Checkbox
											id={item.id}
											checked={selectedItems.includes(
												item.id
											)}
											onCheckedChange={(checked) =>
												setSelectedItems(
													(prevSelectedItems) =>
														checked
															? [
																	...prevSelectedItems,
																	item.id,
															  ]
															: prevSelectedItems.filter(
																	(id) =>
																		id !==
																		item.id
															  )
												)
											}
										/>
									</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.amount}</TableCell>
									<TableCell>{item.tags}</TableCell>
									<TableCell className="text-right">
										{deleting &&
										deletingItemId == item.id ? (
											<Button disabled>
												<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
												Deleting...
											</Button>
										) : (
											<Button
												variant="destructive"
												onClick={() =>
													handleDelete(item.id)
												}
											>
												Delete
											</Button>
										)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableSkeleton />
						)}
					</TableBody>
				</Table>
			</div>{" "}
			<div className="border w-full p-2 sm:w-4/6 flex  gap-3 items-center justify-between ">
				<p className="text-lg font-semibold">
					Total Expenditure : Rs {sum}
					{`/-`}
					<Button
						variant="secondary"
						className="ml-4"
						onClick={() => handleSumAmount()}
					>
						Total
					</Button>
				</p>
				<div>
					<Link href={"/finance"}>
						<Button variant={"link"}>Add more</Button>
					</Link>{" "}
				</div>
			</div>
		</main>
	);
}
