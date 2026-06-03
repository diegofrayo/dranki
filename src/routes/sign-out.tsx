import { createFileRoute } from "@tanstack/react-router";

import SignOutPage from "~/features/pages/sign-out";

export const Route = createFileRoute("/sign-out")({
	component: SignOutPage,
});
