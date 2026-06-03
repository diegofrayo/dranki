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
			STORAGE_KEY_ID: z.string().nonempty(),
			STORAGE_SECRET_ACCESS: z.string().nonempty(),
		})
	: z.object({
			...sharedEnvVarsSchema,
			STORAGE_KEY_ID: z.string().optional(),
			STORAGE_SECRET_ACCESS: z.string().optional(),
		});

const EnvVars = envSchema.parse(RawEnvVars);

export default EnvVars;
