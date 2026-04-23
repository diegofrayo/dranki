import { createSupabaseServerClientWithResponse } from "../supabase/server.tns";

export type ExchangeCodeResult =
	| { ok: true; setCookieHeaders: string[] }
	| { ok: false; error: string; setCookieHeaders: string[] };

export async function exchangeCodeForSession(code: string): Promise<ExchangeCodeResult> {
	const { client, getSetCookieHeaders } = createSupabaseServerClientWithResponse();
	const { error } = await client.auth.exchangeCodeForSession(code);

	if (error) {
		return { ok: false, error: error.message, setCookieHeaders: getSetCookieHeaders() };
	}
	return { ok: true, setCookieHeaders: getSetCookieHeaders() };
}
