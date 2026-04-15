import { createFileRoute } from "@tanstack/react-router";

import api from "~/api";
import LessonsPage from "~/features/pages/lessons";

export const Route = createFileRoute("/lessons")({
	loader: async () => {
		const lessons = await api.lessons.getLessons();

		return { lessons };
	},
	component: function LessonsPageWrapper() {
		const { lessons } = Route.useLoaderData();

		return <LessonsPage lessons={lessons} />;
	},
});
