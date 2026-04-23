import { createFileRoute } from "@tanstack/react-router";

import { exchangeCodeForSession } from "~/features/auth/callback/exchange-code.tns";

function redirectResponse(location: string, setCookieHeaders: string[]): Response {
	const headers = new Headers({ Location: location });
	setCookieHeaders.forEach((cookie) => headers.append("Set-Cookie", cookie));
	return new Response(null, { status: 302, headers });
}

export const Route = createFileRoute("/auth/callback")({
	server: {
		handlers: {
			async GET({ request }) {
				const url = new URL(request.url);
				const code = url.searchParams.get("code");
				const next = url.searchParams.get("next") ?? "/";

				if (!code) {
					return redirectResponse(`${url.origin}/sign-in?error=missing_code`, []);
				}

				const result = await exchangeCodeForSession(code);
				if (!result.ok) {
					return redirectResponse(
						`${url.origin}/sign-in?error=${encodeURIComponent(result.error)}`,
						result.setCookieHeaders,
					);
				}

				return redirectResponse(`${url.origin}${next}`, result.setCookieHeaders);
			},
		},
	},
});
