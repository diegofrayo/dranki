import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import EnvVars from "~/features/env";

export async function createSupabaseServerClient(): Promise<SupabaseClient> {
	const cookieStore = await cookies();

	return createServerClient(EnvVars.PUBLIC_SUPABASE_URL, EnvVars.PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookieStore.set(name, value, options);
					});
				} catch {
					/* Called from a Server Component — ignore. Middleware refreshes the session. */
				}
			},
		},
	});
}
