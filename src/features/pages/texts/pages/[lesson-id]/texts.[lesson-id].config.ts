import lessonsData from "~/data/lessons.json";
import textsData from "~/data/texts.json";

import type { TextLessonPageProps } from "./texts.[lesson-id].types";

type Lesson = {
	id: string;
	title: string;
	emoji: string;
	description: string;
};

type TextItem = {
	lesson: string;
};

function getLessonDetails(lessonId: string): Lesson | undefined {
	return (lessonsData as Lesson[]).find((lesson) => lesson.id === lessonId);
}

export async function generateMetadata({ params }: TextLessonPageProps) {
	const { "lesson-id": lessonId } = await params;

	const isValid = (textsData as TextItem[]).some((item) => item.lesson === lessonId);
	if (!isValid) {
		return { title: "Lesson not found - dranki" };
	}

	const lesson = getLessonDetails(lessonId);
	if (lesson === undefined) {
		return { title: "Lesson not found - dranki" };
	}

	return {
		title: `${lesson.emoji} ${lesson.title} - dranki`,
		description: lesson.description,
	};
}
