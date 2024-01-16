"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import prisma from "@/prisma/Prisma";

interface User {
	id: string;
	name: string;
	username: string | null;
	age: number | null;
	gender: string | null;
	weight: number | null;
	email: string;
	createdAt: Date;
}

export function useCurrentUser() {
	const { data: session, status } = useSession();
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			if (status === "authenticated" && session?.user?.email) {
				try {
					const user = await prisma.user.findUnique({
						where: {
							email: session.user.email,
						},
					});

					setCurrentUser(user || null);
				} catch (error) {
					console.error("Error fetching current user:", error);
					setCurrentUser(null);
				}
			}
		};

		fetchCurrentUser();
	}, [status, session]);

	return currentUser;
}
