import { z } from "zod";

import RawEnvVars from "./env.next";

const envSchema = z.object({
	PUBLIC_SUPABASE_URL: z.string().min(1),
	PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const EnvVars = envSchema.parse(RawEnvVars);

export default EnvVars;
