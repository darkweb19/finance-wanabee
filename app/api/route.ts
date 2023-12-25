import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export interface responseProps {
	data: string;
}

export async function GET(
	request: NextApiRequest
): Promise<NextResponse<responseProps>> {
	const data = { data: "data" };
	return NextResponse.json(data);
}
