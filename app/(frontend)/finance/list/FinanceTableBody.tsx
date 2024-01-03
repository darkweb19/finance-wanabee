import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Finance } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TableSkeleton } from "./TableSkeleton";

interface FinanceTableBodyProps {
	data: Finance[];
	selectedItems: string[];
	deleting: boolean;
	deletingItemId: string;
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	handleDelete: (id: string) => void;
}

const FinanceTableBody: React.FC<FinanceTableBodyProps> = ({
	data,
	selectedItems,
	deleting,
	deletingItemId,
	setSelectedItems,
	handleDelete,
}) => {
	return (
		<TableBody>
			{Array.isArray(data) && data.length === 0 ? (
				<p className="text-center">Database is empty</p>
			) : Array.isArray(data) && data.length > 0 ? (
				data.map((item: Finance, index) => (
					<TableRow key={index}>
						<TableCell>
							<Checkbox
								id={item.id}
								checked={selectedItems.includes(item.id)}
								onCheckedChange={(checked) =>
									setSelectedItems((prevSelectedItems) =>
										checked
											? [...prevSelectedItems, item.id]
											: prevSelectedItems.filter(
													(id) => id !== item.id
											  )
									)
								}
							/>
						</TableCell>
						<TableCell>{item.name}</TableCell>
						<TableCell>{item.amount}</TableCell>
						<TableCell>{item.tags}</TableCell>
						<TableCell className="text-right">
							{deleting && deletingItemId === item.id ? (
								<Button disabled>
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
									Deleting...
								</Button>
							) : (
								<Button
									variant="destructive"
									onClick={() => handleDelete(item.id)}
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
	);
};

export default FinanceTableBody;
