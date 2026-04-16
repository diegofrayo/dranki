import type { Lesson } from "~/api";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export async function generateMetadataLessonPage(lesson: Lesson | undefined): Promise<Metadata> {
	if (!lesson) {
		return { title: composePageTitle("Lesson not found") };
	}

	return {
		title: composePageTitle(`${lesson.emoji} ${lesson.title}`),
		description: lesson.description,
	};
}
