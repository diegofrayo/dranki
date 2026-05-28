import { createFileRoute } from "@tanstack/react-router";

import SoundsPage from "~/features/pages/dev/sounds";
import { composePageTitle } from "~/utils/misc";

export const Route = createFileRoute("/dev/sounds")({
	head: () => ({
		meta: [{ title: composePageTitle("Sounds") }],
	}),
	component: SoundsPage,
});
