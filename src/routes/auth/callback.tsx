import { createFileRoute } from "@tanstack/react-router";

import { Routes } from "~/constants";
import { exchangeCodeForSession } from "~/features/auth/callback/exchange-code.tns";
import EnvVars from "~/features/env";

export const Route = createFileRoute("/auth/callback")({
	server: {
		handlers: {
			async GET({ request }) {
				const url = new URL(request.url);
				const code = url.searchParams.get("code");
				const next = url.searchParams.get("next") ?? "/";
				const origin = EnvVars.PUBLIC_WEBSITE_URL;

				if (!code) {
					return redirectResponse(`${origin}/${Routes.SIGN_IN}?error=${"Invalid URL."}`, []);
				}

				const result = await exchangeCodeForSession(code);

				if (!result.ok) {
					console.log(result.error);
					console.log("code:", code);
					console.log("next:", next);
					console.log("");

					return redirectResponse(
						`${url.origin}/${Routes.SIGN_IN}?error=${encodeURIComponent("Something went wrong. Please try again.")}`,
						result.setCookieHeaders,
					);
				}

				return redirectResponse(`${origin}${next}`, result.setCookieHeaders);
			},
		},
	},
});

function redirectResponse(location: string, setCookieHeaders: string[]): Response {
	const headers = new Headers({ Location: location });
	setCookieHeaders.forEach((cookie) => headers.append("Set-Cookie", cookie));
	return new Response(null, { status: 302, headers });
}
