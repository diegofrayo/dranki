import { createSupabaseBrowserClient } from "../supabase/client";

export async function signOut(): Promise<void> {
	const supabase = createSupabaseBrowserClient();
	await supabase.auth.signOut();
}
