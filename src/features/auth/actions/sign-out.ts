import { createSupabaseServerClient } from "../supabase/server.adapter";

export async function signOut(): Promise<unknown> {
	const supabase = await createSupabaseServerClient();
	return supabase.auth.signOut();
}
