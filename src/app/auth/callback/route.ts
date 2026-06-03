import { NextResponse } from "next/server";

import { Routes } from "~/constants";
import { exchangeCodeForSession } from "~/features/auth/callback/exchange-code.next";
import EnvVars from "~/features/env";

export async function GET(request: Request): Promise<NextResponse> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const next = url.searchParams.get("next") ?? "/";
	const origin = EnvVars.PUBLIC_WEBSITE_URL;

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
