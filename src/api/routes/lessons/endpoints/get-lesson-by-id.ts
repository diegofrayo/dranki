import type { Lesson } from "../../../types";
import getLessons from "./get-lessons";

async function getLessonById(lessonId: string): Promise<GetLessonByIdResponse> {
	const lessons = await getLessons();
	const lesson = lessons.find((item) => item.id === lessonId);

	// if (!lesson) {
	// 	throw new Error(`Lesson with id "${lessonId}" not found`);
	// }

	return lesson;
}

export default getLessonById;

// --- TYPES ---

export type GetLessonByIdResponse = Lesson | undefined;
