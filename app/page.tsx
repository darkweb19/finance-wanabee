import NavigationLinks from "./Navigation";

export default function Home() {
	return (
		<main className="text-center p-3 h-dvh sm:h-screen flex flex-col justify-center items-center gap-10">
			<span className={` text-3xl sm:text-4xl text-slate-600`}>
				Finance Wanabee
			</span>
			<NavigationLinks />
		</main>
	);
}
