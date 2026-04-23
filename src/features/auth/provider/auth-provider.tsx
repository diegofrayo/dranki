"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { signInWithMagicLink } from "../actions/sign-in-with-magic-link";
import { signOut } from "../actions/sign-out";
import { createSupabaseBrowserClient } from "../supabase/client";
import type { AuthContextValue, AuthStatus, Session, User } from "../types";

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
	children: ReactTypes.Children;
	initialUser?: User | null;
};

export function AuthProvider({
	children,
	initialUser = null,
}: AuthProviderProps): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(initialUser);
	const [status, setStatus] = useState<AuthStatus>(initialUser ? "authenticated" : "loading");

	// --- EFFECTS ---
	useEffect(function syncAuthState() {
		const supabase = createSupabaseBrowserClient();

		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setStatus(data.session ? "authenticated" : "unauthenticated");
		});

		const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			setSession(nextSession);
			setUser(nextSession?.user ?? null);
			setStatus(nextSession ? "authenticated" : "unauthenticated");
		});

		return function cleanup() {
			subscription.subscription.unsubscribe();
		};
	}, []);

	// --- COMPUTED STATES ---
	const value = useMemo<AuthContextValue>(
		() => ({
			session,
			status,
			user,
			signInWithMagicLink,
			signOut,
		}),
		[session, status, user],
	);

	return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
	const context = use(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
