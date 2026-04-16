import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import LessonPage from "~/features/pages/lessons/pages/[lesson-id]";
import { loader } from "~/features/pages/lessons/pages/[lesson-id]/lessons.[lesson-id].loader.server";
import { generateMetadataLessonPage } from "~/features/pages/lessons/pages/[lesson-id]/lessons.[lesson-id].metadata";

type LessonPageProps = {
	params: Promise<{ "lesson-id": string }>;
};

export default async function LessonPageWrapper({
	params,
}: LessonPageProps): Promise<ReactTypes.JSXElement> {
	const lessonId = (await params)["lesson-id"];
	const { lesson, lessonContent } = await loader(lessonId);

	if (!lesson || !lessonContent) {
		return notFound();
	}

	return (
		<LessonPage
			lesson={lesson}
			content={lessonContent}
		/>
	);
}

export async function generateMetadata({
	params,
}: LessonPageProps): ReturnType<typeof generateMetadataLessonPage> {
	const lessonId = (await params)["lesson-id"];
	const lesson = await api.lessons.getLessonById(lessonId);

	return generateMetadataLessonPage(lesson);
}
