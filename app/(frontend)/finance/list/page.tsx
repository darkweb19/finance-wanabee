"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSWR from "swr";
import { deleteFinance } from "./utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FinanceTableBody from "./FinanceTableBody";
import FinanceListFooter from "./FinanceListFooter";
import { Finance } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { getUser } from "@/lib/getUser";

const devApiUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodApiUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const apiUrl = process.env.NODE_ENV === "development" ? devApiUrl : prodApiUrl;
const URL = `${apiUrl}/api/finances/`;

const getFinanceData = async () => {
	const session = await getSession();

	const curruser = await getUser(session?.user?.email ?? "");

	const data = await fetch(`${apiUrl}/api/finances?userid=${curruser?.id}`, {
		cache: "no-store",
	});
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
	const [sum, setSum] = useState(0);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [currUserId, setCurrUserId] = useState("");
	const { data, error, mutate } = useSWR(
		`${apiUrl}/api/finances?userid=${currUserId}`,
		getFinanceData
	);

	useEffect(() => {
		// Recalculate sum when selectedItems or data changes
		async function currentUser() {
			const session = await getSession();
			const curruser = await getUser(session?.user?.email ?? "");
			setCurrUserId(curruser?.id ?? "");
		}
		currentUser();
		handleSumAmount();
	}, [selectedItems, data, currUserId]);

	function handleSumAmount() {
		let amountSum = 0;

		Array.isArray(data) &&
			data.forEach((item: Finance) =>
				selectedItems.includes(item.id)
					? setSum((amountSum = amountSum + item.amount)) // Increase by pre amount
					: null
			);
	}

	function handleReset() {
		setSum(0);
		setSelectedItems([]);
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

	function addAll() {
		selectAll(true);
		handleSumAmount();
	}

	async function handleDelete(id: string) {
		setDeleting(true);
		setDeletingItemId(id);
		setSum(0);
		await deleteFinance(id);
		toast.success("Deleted");
		mutate(URL);
		setDeleting(false);
	}

	const session = useSession();

	return (
		<main className="h-dvh sm:h-screen p-3 w-full flex flex-col gap-3 items-center justify-center">
			<h1 className="text-3xl font-semibold">
				{session.status === "authenticated" && session.data.user?.name}{" "}
				Expenses :
			</h1>
			<div className="p-4 sm:p-3 w-full sm:w-4/6 rounded-md shadow-lg h-fit overflow-scroll">
				<Table>
					{Array.isArray(data) && data.length > 0 && (
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">
									<Checkbox
										checked={selectedItems.length > 0}
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

					<FinanceTableBody
						data={data}
						selectedItems={selectedItems}
						deleting={deleting}
						deletingItemId={deletingItemId}
						setSelectedItems={setSelectedItems}
						handleDelete={handleDelete}
					/>
				</Table>
			</div>{" "}
			{Array.isArray(data) && data.length > 0 && (
				<FinanceListFooter
					sum={sum}
					handleSumAmount={handleSumAmount}
					handleReset={handleReset}
					handleAll={addAll}
				/>
			)}
		</main>
	);
}
