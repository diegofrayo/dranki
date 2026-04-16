import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { loader } from "~/features/pages/lessons/lessons.loader.server";
import LessonsPage from "~/features/pages/lessons/lessons.page";
import { composePageTitle } from "~/utils/misc";

export const getData = createServerFn().handler(async () => {
	return loader();
});

export const Route = createFileRoute("/lessons/")({
	head: () => ({
		meta: [{ title: composePageTitle("Lessons") }],
	}),
	loader: async () => {
		return getData();
	},
	component: function LessonsPageWrapper() {
		const { lessons } = Route.useLoaderData();

		return <LessonsPage lessons={lessons} />;
	},
});
