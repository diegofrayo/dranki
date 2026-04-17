import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import type { NonNullableObject } from "@diegofrayo-pkg/types";

import { loader } from "~/features/pages/lessons/pages/[lesson-id]/[lesson-id].loader.server";
import { generateMetadataLessonPage } from "~/features/pages/lessons/pages/[lesson-id]/[lesson-id].metadata";
import LessonPage from "~/features/pages/lessons/pages/[lesson-id]/[lesson-id].page";

type LoaderData = NonNullableObject<Awaited<ReturnType<typeof loader>>>;

const getServerData = createServerFn()
	.inputValidator((data: { lessonId: string }) => data)
	.handler((ctx) => {
		return loader(ctx.data.lessonId);
	});

export const Route = createFileRoute("/lessons/$lessonId")({
	head: async (ctx) => ({
		meta: [await generateMetadataLessonPage((ctx.loaderData as unknown as LoaderData).lesson)],
	}),
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
