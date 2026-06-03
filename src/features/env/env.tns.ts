import type { EnvVars } from "./types";

const TNSEnvVars: EnvVars = {
	PUBLIC_SUPABASE_ANON_KEY: import.meta.env["VITE_SUPABASE_ANON_KEY"],
	PUBLIC_SUPABASE_URL: import.meta.env["VITE_SUPABASE_URL"],
	PUBLIC_WEBSITE_URL: import.meta.env["VITE_WEBSITE_URL"],
	STORAGE_KEY_ID: process.env["STORAGE_KEY_ID"],
	STORAGE_SECRET_ACCESS: process.env["STORAGE_SECRET_ACCESS"],
};

export default TNSEnvVars;
