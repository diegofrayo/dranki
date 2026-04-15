import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import LessonPage, { pageConfig } from "~/features/pages/lessons/pages/[lesson-id]";

const getServerData = createServerFn()
	.inputValidator((data: { lessonId: string }) => data)
	.handler(async (ctx) => {
		const { lessonContent, lesson } = await pageConfig.loader(ctx.data.lessonId);
		return { lessonContent, lesson };
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
