import type { Session as SupabaseSession, User as SupabaseUser } from "@supabase/supabase-js";

export type User = SupabaseUser;
export type Session = SupabaseSession;

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type AuthContextValue = {
	session: Session | null;
	status: AuthStatus;
	user: User | null;
	signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
	signOut: () => Promise<void>;
};
