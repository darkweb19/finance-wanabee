import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function TableSkeleton() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>
						<Skeleton className="h-6 w-6" />
					</TableHead>
					<TableHead>
						<Skeleton className="h-6 w-[250px]" />
					</TableHead>
					<TableHead>
						<Skeleton className="h-6 w-[200px]" />
					</TableHead>
					<TableHead className="text-right">
						<Skeleton className="h-10 w-20" />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{[1, 2, 3, 4].map((index) => (
					<TableRow key={index}>
						<TableCell>
							<Skeleton className="h-6 w-4" />
						</TableCell>
						<TableCell>
							<Skeleton className="h-6 w-[150px]" />
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
