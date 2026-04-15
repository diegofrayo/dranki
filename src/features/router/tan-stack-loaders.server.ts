import api from "~/api";
import decksPageConfig from "~/features/pages/decks/pages/[deck-id]/decks.[deck-id].config";
import lessonsPageConfig from "~/features/pages/lessons/pages/[lesson-id]/lessons.[lesson-id].config";
import textsPageConfig from "~/features/pages/texts/pages/[text-id]/texts.[text-id].config";

export async function lessonLoader(
	lessonId: string,
): Promise<ReturnType<typeof lessonsPageConfig.loader>> {
	return lessonsPageConfig.loader(lessonId);
}

export async function lessonsLoader(): Promise<ReturnType<typeof api.lessons.getLessons>> {
	return api.lessons.getLessons();
}

export async function textLoader(
	lessonId: string,
): Promise<ReturnType<typeof textsPageConfig.loader>> {
	return textsPageConfig.loader(lessonId);
}

export async function textsLoader(): Promise<ReturnType<typeof api.texts.getTexts>> {
	return api.texts.getTexts();
}

export async function deckLoader(
	deckId: string,
): Promise<ReturnType<typeof decksPageConfig.loader>> {
	return decksPageConfig.loader(deckId);
}

export async function decksLoader(): Promise<ReturnType<typeof api.decks.getDecks>> {
	return api.decks.getDecks();
}
