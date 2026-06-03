import { createSupabaseBrowserClient } from "../supabase/client";

export async function signOut(): Promise<unknown> {
	const supabase = createSupabaseBrowserClient();
	return supabase.auth.signOut();
}
