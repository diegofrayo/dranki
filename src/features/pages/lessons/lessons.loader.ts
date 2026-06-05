import api from "~/api";
import type { Lesson } from "~/api/types";

export async function loader(): Promise<{ lessons: Lesson[] }> {
	const lessons = await api.lessons.getLessons();

	return { lessons };
}
