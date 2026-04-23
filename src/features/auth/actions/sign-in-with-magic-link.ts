import { createSupabaseBrowserClient } from "../supabase/client";

export async function signInWithMagicLink(email: string): Promise<{ error: Error | null }> {
	const supabase = createSupabaseBrowserClient();
	const redirectTo = `${window.location.origin}/auth/callback?next=/`;

	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: redirectTo,
			shouldCreateUser: true,
		},
	});

	return { error };
}
