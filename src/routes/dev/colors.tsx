import { createFileRoute } from "@tanstack/react-router";

import ColorsPage from "~/features/pages/dev/colors";
import { composePageTitle } from "~/utils/misc";

export const Route = createFileRoute("/dev/colors")({
	head: () => ({
		meta: [{ title: composePageTitle("Colors") }],
	}),
	component: ColorsPage,
});
