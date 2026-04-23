import { NextResponse } from "next/server";

import { exchangeCodeForSession } from "~/features/auth/callback/exchange-code.next";

export async function GET(request: Request): Promise<NextResponse> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const next = url.searchParams.get("next") ?? "/";

	if (!code) {
		return NextResponse.redirect(new URL("/sign-in?error=missing_code", url.origin));
	}

	const result = await exchangeCodeForSession(code);

	if (!result.ok) {
		return NextResponse.redirect(
			new URL(`/sign-in?error=${encodeURIComponent(result.error)}`, url.origin),
		);
	}

	return NextResponse.redirect(new URL(next, url.origin));
}
