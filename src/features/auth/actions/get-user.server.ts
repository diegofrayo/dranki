import { createSupabaseServerClient } from "../supabase/server.adapter";
import type { User } from "../types";

export async function getUser(): Promise<User | null> {
	const supabase = await createSupabaseServerClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data.user) return null;

	return data.user;
}
