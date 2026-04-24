import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import EnvVars from "~/features/env";

async function proxy(request: NextRequest): Promise<NextResponse> {
	let response = NextResponse.next({ request });

	const supabase = createServerClient(
		EnvVars.PUBLIC_SUPABASE_URL,
		EnvVars.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					response = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	/* Refresh the session so cookies stay fresh. Do not remove this call. */
	await supabase.auth.getUser();

	return response;
}

export default proxy;

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
