import api, { type Lesson } from "~/api";

export async function loader(): Promise<{ lessons: Lesson[] }> {
	const lessons = await api.lessons.getLessons();

	return { lessons };
}
