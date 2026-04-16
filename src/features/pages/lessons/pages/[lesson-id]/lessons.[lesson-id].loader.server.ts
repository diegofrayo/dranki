import api, { type Lesson } from "~/api";

export async function loader(
	lessonId: string,
): Promise<{ lesson: Lesson | undefined; lessonContent: string }> {
	const lesson = await api.lessons.getLessonById(lessonId);
	const lessonContent = await api.lessons.getLessonContent(lessonId);

	return { lesson, lessonContent };
}
