import { z } from "zod";

import { isServer } from "@diegofrayo-pkg/validator";

import RawEnvVars from "./env.next";

const sharedEnvVarsSchema = {
	PUBLIC_SUPABASE_ANON_KEY: z.string().nonempty(),
	PUBLIC_SUPABASE_URL: z.string().nonempty(),
	PUBLIC_WEBSITE_URL: z.string().nonempty(),
};

const envSchema = isServer()
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
