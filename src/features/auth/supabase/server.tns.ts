import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getRequest } from "@tanstack/react-start/server";

import EnvVars from "~/features/env";

function readCookiesFromRequest(): { name: string; value: string }[] {
	const request = getRequest();
	const header = request?.headers.get("cookie") ?? "";
	return parseCookieHeader(header).filter(
		(c): c is { name: string; value: string } => typeof c.value === "string",
	);
}

/* Read-only server client — callers get the session but cannot refresh cookies.
 * For flows that must write Set-Cookie (callback, sign-out), use
 * `createSupabaseServerClientWithResponse` and attach the returned headers to the Response. */
export async function createSupabaseServerClient(): Promise<SupabaseClient> {
	const cookies = readCookiesFromRequest();

	return createServerClient(EnvVars.PUBLIC_SUPABASE_URL, EnvVars.PUBLIC_SUPABASE_URL, {
		cookies: {
			getAll() {
				return cookies;
			},
			setAll() {
				/* no-op: read-only context */
			},
		},
	});
}

export function createSupabaseServerClientWithResponse(): {
	client: SupabaseClient;
	getSetCookieHeaders: () => string[];
} {
	const cookies = readCookiesFromRequest();
	const outgoing: string[] = [];

	const client = createServerClient(EnvVars.PUBLIC_SUPABASE_URL, EnvVars.PUBLIC_SUPABASE_URL, {
		cookies: {
			getAll() {
				return cookies;
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => {
					outgoing.push(serializeCookieHeader(name, value, options));
				});
			},
		},
	});

	return { client, getSetCookieHeaders: () => outgoing };
}
