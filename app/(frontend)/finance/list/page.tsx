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

const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodApiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : prodApiUrl;
const URL = `${apiUrl}/api/finance`;

const getFinanceData = async () => {
	const data = await fetch(URL, { cache: "no-store" });
	const dataFinance = await data.json();
	// console.log(dataFinance.data);
	return dataFinance.data;
};

export default function FinanceList() {
	const { data, error, mutate } = useSWR(URL, getFinanceData);

	return (
		<main className="h-screen w-full flex flex-col gap-3 items-center justify-center">
			<h1 className="text-3xl font-semibold">All Expenses :</h1>
			<div className="p-4 sm:p-2 w-full sm:w-4/6 rounded-md shadow-lg">
				<Table>
					{Array.isArray(data) && data.length > 0 && (
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									Select
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
					)}
					<TableBody>
						{Array.isArray(data) && data.length > 0 ? (
							data.map((item: Finance, index) => (
								<TableRow key={index}>
									<TableCell>
										<Checkbox id={item.id} />{" "}
									</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.amount}</TableCell>
									<TableCell className="text-right">
										<Button>Delete</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableSkeleton />
						)}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
