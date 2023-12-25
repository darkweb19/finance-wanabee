async function getUser() {
	try {
		const data = await fetch("/api/user");
		const finalData = await data.json();
		console.log(finalData);
	} catch (err) {
		console.log("Cannot fetch req", err);
	}
}

export default function Home() {
	getUser();
	return (
		<main className="text-center h-screen flex justify-center items-center gap-2">
			Hello World
		</main>
	);
}
