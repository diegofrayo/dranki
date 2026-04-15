import { createFileRoute } from "@tanstack/react-router";

import HomePage from "~/features/pages/index";

export const Route = createFileRoute("/")({
	component: HomePage,
});
