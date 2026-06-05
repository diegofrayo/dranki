import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { Routes } from "~/constants/routes";
import { getUser } from "~/features/auth/actions/get-user";
import SignInPage from "~/features/pages/sign-in";
import { composePageTitle } from "~/utils/misc";

const checkAuth = createServerFn().handler(async () => {
	const user = await getUser();
	return { isAuthenticated: user || false };
});

export const Route = createFileRoute("/sign-in")({
	head: () => ({
		meta: [{ title: composePageTitle("Sign in") }],
	}),
	beforeLoad: async () => {
		const { isAuthenticated } = await checkAuth();

		if (isAuthenticated) {
			throw redirect({ to: Routes.INDEX });
		}
	},
	component: SignInPage,
});
