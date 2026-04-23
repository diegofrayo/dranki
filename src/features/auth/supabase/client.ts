import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import EnvVars from "~/features/env";

let browserClient: SupabaseClient | null = null;

export function createSupabaseBrowserClient(): SupabaseClient {
	if (browserClient) return browserClient;

	browserClient = createBrowserClient(EnvVars.PUBLIC_SUPABASE_URL, EnvVars.PUBLIC_SUPABASE_URL);
	return browserClient;
}
