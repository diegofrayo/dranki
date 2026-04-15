import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import LessonPage from "~/features/pages/lessons/pages/[lesson-id]/lessons.[lesson-id].page";
import { lessonLoader } from "~/features/router/tan-stack-loaders.server";

const getServerData = createServerFn()
	.inputValidator((data: { lessonId: string }) => data)
	.handler((ctx) => {
		return lessonLoader(ctx.data.lessonId);
	});

export const Route = createFileRoute("/lessons/$lessonId")({
	ssr: true,
	loader: async ({ params }) => {
		const lessonId = params["lessonId"];

		return getServerData({ data: { lessonId } });
	},
	component: function LessonPageWrapper() {
		const { lesson, lessonContent } = Route.useLoaderData();

		return (
			<LessonPage
				lesson={lesson}
				content={lessonContent}
			/>
		);
	},
});
