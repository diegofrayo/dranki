import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { Routes } from "~/constants/routes";
import { signOut } from "~/features/auth/actions/sign-out";

const signOutFn = createServerFn().handler(async () => {
	await signOut();
});

export const Route = createFileRoute("/sign-out")({
	beforeLoad: async () => {
		await signOutFn();
		throw redirect({ to: Routes.INDEX });
	},
	component: () => null,
});
