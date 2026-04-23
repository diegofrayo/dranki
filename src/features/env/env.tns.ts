import type { EnvVars } from "./types";

const TNSEnvVars: EnvVars = {
	PUBLIC_SUPABASE_URL: import.meta.env["VITE_SUPABASE_URL"],
	PUBLIC_SUPABASE_ANON_KEY: import.meta.env["VITE_SUPABASE_ANON_KEY"],
};

export default TNSEnvVars;
