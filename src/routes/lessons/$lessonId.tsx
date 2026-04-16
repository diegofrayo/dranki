import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import LessonPage from "~/features/pages/lessons/pages/[lesson-id]/lessons.[lesson-id].page";
import { lessonLoader } from "~/features/router/tan-stack-loaders.server";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof lessonLoader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { lessonId: string }) => data)
	.handler((ctx) => {
		return lessonLoader(ctx.data.lessonId);
	});

export const Route = createFileRoute("/lessons/$lessonId")({
	loader: async ({ params }): Promise<LoaderData> => {
		const lessonId = params["lessonId"];
		const { lesson, lessonContent } = await getServerData({ data: { lessonId } });

		if (!lesson) throw notFound();

		return { lesson, lessonContent };
	},
	component: function LessonPageWrapper() {
		const { lesson, lessonContent } = Route.useLoaderData() as LoaderData;

		return (
			<LessonPage
				lesson={lesson}
				content={lessonContent}
			/>
		);
	},
});
