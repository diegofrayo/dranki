import api, { type Deck, type Lesson, type Text } from "~/api";

export async function loader(lessonId: string): Promise<{
	lesson: Lesson | undefined;
	lessonContent: string;
	practiceTexts: Text[];
	practiceDecks: Deck[];
}> {
	const [lesson, lessonContent, practiceTexts, practiceDecks] = await Promise.all([
		api.lessons.getLessonById(lessonId),
		api.lessons.getLessonContent(lessonId),
		api.texts.getTextsByLessonId(lessonId),
		api.decks.getDecksByLessonId(lessonId),
	]);

	return { lesson, lessonContent, practiceTexts, practiceDecks };
}
