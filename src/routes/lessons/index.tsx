import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import api from "~/api";
import LessonsPage from "~/features/pages/lessons";

export const getData = createServerFn().handler(async () => {
	const lessons = await api.lessons.getLessons();
	return { lessons };
});

export const Route = createFileRoute("/lessons/")({
	loader: async () => {
		return getData();
	},
	component: function LessonsPageWrapper() {
		const { lessons } = Route.useLoaderData();

		return <LessonsPage lessons={lessons} />;
	},
});
