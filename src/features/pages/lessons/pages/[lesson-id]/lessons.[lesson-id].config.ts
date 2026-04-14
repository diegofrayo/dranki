import type { Metadata } from "next";

import api, { type Lesson } from "~/api";

async function generateMetadata(lessonId: string): Promise<Metadata> {
	const lesson = await api.lessons.getLessonById(lessonId);

	if (!lesson) {
		return { title: "Lesson not found - dranki" };
	}

	return {
		title: `${lesson.emoji} ${lesson.title} - dranki`,
		description: lesson.description,
	};
}

async function loader(
	lessonId: string,
): Promise<{ lesson: Lesson | undefined; lessonContent: string }> {
	const lesson = await api.lessons.getLessonById(lessonId);
	const lessonContent = await api.lessons.getLessonContent(lessonId);

	return { lesson, lessonContent };
}

export default {
	generateMetadata,
	loader,
};
