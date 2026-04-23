import "server-only";

import { createSupabaseServerClient } from "../supabase/server.next";

export type ExchangeCodeResult = { ok: true } | { ok: false; error: string };

export async function exchangeCodeForSession(code: string): Promise<ExchangeCodeResult> {
	const supabase = await createSupabaseServerClient();
	const { error } = await supabase.auth.exchangeCodeForSession(code);

	if (error) {
		return { ok: false, error: error.message };
	}
	return { ok: true };
}
