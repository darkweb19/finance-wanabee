"use client";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/prisma/Prisma";

interface User {
	id: string;
	name: string | null;
	username: string | null;
	age: number | null;
	gender: string | null;
	weight: number | null;
	email: string;
	createdAt: Date;
}

export function useCurrentUser() {
	const [sessionUser, setSessionUser] = useState("");
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const session = await getSession();
			setSessionUser(session?.user?.name ?? "");
			if (session?.user?.email) {
				try {
					const user = await prisma.user.findUnique({
						where: {
							email: session.user.email,
						},
					});
					// console.log("From Custom hooks", currentUser);
					setCurrentUser(user || null);
				} catch (error) {
					console.error("Error fetching current user:", error);
					setCurrentUser(null);
				}
			}
		};

		fetchCurrentUser();
	}, [sessionUser]);

	return currentUser;
}
