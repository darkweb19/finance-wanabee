import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function UserTableSkeleton() {
	return (
		<Table>
			<TableBody>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
					<TableRow key={index}>
						<TableCell>
							<Skeleton className="h-6 w-4" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-[150px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-[150px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-[50px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-[50px]" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-[100px]" />
						</TableCell>
						<TableCell className="text-right">
							<Skeleton className="h-10 w-20" />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
