import type { EnvVars } from "./types";

const NextEnvVars: EnvVars = {
	PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
	PUBLIC_SUPABASE_ANON_KEY: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
};

export default NextEnvVars;
