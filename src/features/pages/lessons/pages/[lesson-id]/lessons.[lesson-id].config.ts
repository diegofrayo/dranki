import lessonsData from "~/data/lessons.json";

import type { LessonPageProps } from "./lessons.[lesson-id].types";

type Lesson = {
	id: string;
	title: string;
	emoji: string;
	description: string;
};

function getLessonDetails(lessonId: string): Lesson | undefined {
	return (lessonsData as Lesson[]).find((lesson) => lesson.id === lessonId);
}

export async function generateMetadata({ params }: LessonPageProps) {
	const { "lesson-id": lessonId } = await params;

	const lesson = getLessonDetails(lessonId);
	if (lesson === undefined) {
		return { title: "Lesson not found - dranki" };
	}

	return {
		title: `${lesson.emoji} ${lesson.title} - dranki`,
		description: lesson.description,
	};
}
