"use client";

import { useMountEffect } from "@diegofrayo-pkg/hooks";

import { Routes } from "~/constants";
import { signOut } from "~/features/auth/actions/sign-out";

export default function SignOutPage(): null {
	// --- UTILS ---
	async function signOutFn(): Promise<void> {
		await signOut();
		window.history.replaceState(null, "", Routes.INDEX);
		window.location.reload();
	}

	// --- EFFECTS ---
	useMountEffect(() => {
		void signOutFn();
	});

	return null;
}
