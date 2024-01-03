import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FinanceListFooterProps {
	sum: number;
	handleSumAmount: () => void;
	handleReset: () => void;
	handleAll: () => void;
}

const FinanceListFooter: React.FC<FinanceListFooterProps> = ({
	sum,
	handleSumAmount,
	handleReset,
	handleAll,
}) => {
	return (
		<div className="border w-full p-2 sm:w-4/6 flex  gap-3 items-center justify-between">
			<p className="text-lg font-semibold">
				Total Expenditure : Rs {sum}
				{`/-`}
				<Button
					variant="secondary"
					className="ml-4"
					disabled={sum == 0}
					onClick={() => handleSumAmount()}
				>
					Total
				</Button>
				<Button
					variant="secondary"
					className="ml-4"
					onClick={() => handleReset()}
				>
					Reset
				</Button>
				<Button
					variant="secondary"
					className="ml-4"
					onClick={() => handleAll()}
				>
					Add All
				</Button>
			</p>
			<div>
				<Link href={"/finance"}>
					<Button variant={"link"}>Add Expenses</Button>
				</Link>{" "}
			</div>
		</div>
	);
};

export default FinanceListFooter;
