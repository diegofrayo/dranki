import type { Lesson } from "~/api/types";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export function generateMetadataLessonPage(lesson: Lesson | undefined): Metadata {
	if (!lesson) {
		return { title: composePageTitle("Lesson not found") };
	}

	return {
		title: composePageTitle(`${lesson.emoji} ${lesson.title}`),
		description: lesson.description,
	};
}
