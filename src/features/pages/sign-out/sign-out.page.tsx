"use client";

import { useDidMount } from "@diegofrayo-pkg/hooks";

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
	useDidMount(() => {
		signOutFn();
	});

	return null;
}
