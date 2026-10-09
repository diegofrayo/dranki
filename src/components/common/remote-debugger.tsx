"use client";

import { useMountEffect } from "@diegofrayo-pkg/hooks";
import { injectScript } from "@diegofrayo-pkg/utilities/browser/dom-elements";

export default function RemoteDebugger(): null {
	useMountEffect(() => {
		void initRemoteDebugger();
	});

	return null;
}

// --- UTILS ---

export async function initRemoteDebugger(): Promise<void> {
	if (process.env.NODE_ENV !== "test") return;

	await injectScript({ id: "eruda", src: "https://cdn.jsdelivr.net/npm/eruda" });

	// @ts-expect-error it is a remote debugger, only for development purposes
	window.eruda?.init(); // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
}
