import api, { type Lesson } from "~/api";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

async function generateMetadata(lesson: Lesson | undefined): Promise<Metadata> {
	if (!lesson) {
		return { title: composePageTitle("Lesson not found") };
	}

	return {
		title: composePageTitle(`${lesson.emoji} ${lesson.title}`),
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
