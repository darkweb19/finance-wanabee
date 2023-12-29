"use server";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
	try {
		const res = await fetch(
			`https://finance-wanabee.vercel.app/api/user/delete?id=${id}`
		);
		const response = await res.json();
		if (response.success) {
			revalidatePath("/user/get");
			return { success: true, message: "User Deleted Successfully" };
		} else {
			return { success: false, message: "Error while deleting" };
		}
	} catch (err: any) {
		console.log("error while deleting user", err.message);
		return { success: false, message: err.message };
	}
}
