"use client";

import { useDidMount } from "@diegofrayo-pkg/hooks";

import { loadScript } from "~/utils/misc";

export default function RemoteDebugger(): null {
	useDidMount(() => {
		initRemoteDebugger();
	});

	return null;
}

// --- UTILS ---

export async function initRemoteDebugger(): Promise<void> {
	if (process.env.NODE_ENV !== "test") return;

	await loadScript("https://cdn.jsdelivr.net/npm/eruda");
	// @ts-expect-error it is a remote debugger, only for development purposes
	window.eruda?.init();
}
