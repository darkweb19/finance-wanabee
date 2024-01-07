import NavigationLinks from "./Navigation";
import { Lilita_One } from "next/font/google";

const lilitaFont = Lilita_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
	return (
		<main className="text-center p-3 h-dvh sm:h-screen flex flex-col justify-center items-center gap-10">
			<span
				className={`${lilitaFont.className} text-3xl sm:text-4xl text-slate-600`}
			>
				Finance Wanabee
			</span>
			<NavigationLinks />
		</main>
	);
}
