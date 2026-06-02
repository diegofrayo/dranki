import { NextResponse } from "next/server";

import { isDevelopmentEnvironment } from "@diegofrayo-pkg/utilities/environment";

import { Routes } from "~/constants";
import { exchangeCodeForSession } from "~/features/auth/callback/exchange-code.next";

export async function GET(request: Request): Promise<NextResponse> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const next = url.searchParams.get("next") ?? "/";
	const origin = isDevelopmentEnvironment() ? "https://dranki.local" : url.origin;

	if (!code) {
		return NextResponse.redirect(new URL(`${Routes.SIGN_IN}?error=${"Invalid URL."}`, origin));
	}

	const result = await exchangeCodeForSession(code);

	if (!result.ok) {
		console.log(result.error);
		console.log("code:", code);
		console.log("next:", next);
		console.log("");

		return NextResponse.redirect(
			new URL(`${Routes.SIGN_IN}?error=${"Something went wrong. Please try again."}`, origin),
		);
	}

	return NextResponse.redirect(new URL(next, origin));
}
