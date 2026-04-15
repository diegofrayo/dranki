import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import LessonsPage from "~/features/pages/lessons/lessons.page";
import { lessonsLoader } from "~/features/router/tan-stack-loaders.server";

export const getData = createServerFn().handler(async () => {
	return lessonsLoader();
});

export const Route = createFileRoute("/lessons/")({
	ssr: true,
	loader: async () => {
		return getData();
	},
	component: function LessonsPageWrapper() {
		const { lessons } = Route.useLoaderData();

		return <LessonsPage lessons={lessons} />;
	},
});
