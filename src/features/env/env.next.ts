import type { EnvVars } from "./types";

const NextEnvVars: EnvVars = {
	PUBLIC_SUPABASE_ANON_KEY: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
	PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
	PUBLIC_WEBSITE_URL: process.env["NEXT_PUBLIC_WEBSITE_URL"],
	STORAGE_KEY_ID: process.env["STORAGE_KEY_ID"],
	STORAGE_SECRET_ACCESS: process.env["STORAGE_SECRET_ACCESS"],
};

export default NextEnvVars;
