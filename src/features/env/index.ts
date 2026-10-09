import { z } from "zod";

import { isNonBrowser } from "@diegofrayo-pkg/validator";

import RawEnvVars from "./env.next";

const sharedEnvVarsSchema = {
	PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
	PUBLIC_SUPABASE_URL: z.string().nonempty(),
	PUBLIC_WEBSITE_URL: z.string().nonempty(),
};

const envSchema = isNonBrowser()
	? z.object({
			...sharedEnvVarsSchema,
			SUPABASE_SERVICE_ROLE_KEY: z.string().nonempty(),
		})
	: z.object({
			...sharedEnvVarsSchema,
			SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
		});

const EnvVars = envSchema.parse(RawEnvVars);

export default EnvVars;
