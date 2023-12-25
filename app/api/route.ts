import { NextRequest, NextResponse } from "next/server";

export interface responseProps {
	data: string;
}

export async function GET(
	request: NextRequest
): Promise<NextResponse<responseProps>> {
	const data = { data: "data" };
	return NextResponse.json(data);
}
