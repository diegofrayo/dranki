import { createFileRoute } from "@tanstack/react-router";

import SignInPage from "~/features/pages/sign-in";
import { composePageTitle } from "~/utils/misc";

export const Route = createFileRoute("/sign-in")({
	head: () => ({
		meta: [{ title: composePageTitle("Sign in") }],
	}),
	component: SignInPage,
});
