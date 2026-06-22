import type { EnvVars } from "./types";

const NextEnvVars: EnvVars = {
	PUBLIC_SUPABASE_ANON_KEY: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
	PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
	PUBLIC_WEBSITE_URL: process.env["NEXT_PUBLIC_WEBSITE_URL"],
	SUPABASE_SERVICE_ROLE_KEY: process.env["SUPABASE_SERVICE_ROLE_KEY"],
};

export default NextEnvVars;
