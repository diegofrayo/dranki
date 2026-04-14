import type { Metadata } from "next";

import api from "~/api";

export async function generateMetadata(lessonId: string): Promise<Metadata> {
	const lesson = await api.lessons.getLessonById(lessonId);

	if (!lesson) {
		return { title: "Lesson not found - dranki" };
	}

	return {
		title: `${lesson.emoji} ${lesson.title} - dranki`,
		description: lesson.description,
	};
}
