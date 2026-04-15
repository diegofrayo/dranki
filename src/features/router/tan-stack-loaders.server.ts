import api from "~/api";
import deckPageConfig from "~/features/pages/decks/pages/[deck-id]/decks.[deck-id].config";
import lessonPageConfig from "~/features/pages/lessons/pages/[lesson-id]/lessons.[lesson-id].config";
import textPageConfig from "~/features/pages/texts/pages/[text-id]/texts.[text-id].config";

export async function lessonLoader(lessonId: string): ReturnType<typeof lessonPageConfig.loader> {
	return lessonPageConfig.loader(lessonId);
}

export async function lessonsLoader(): ReturnType<typeof api.lessons.getLessons> {
	return api.lessons.getLessons();
}

export async function textLoader(lessonId: string): ReturnType<typeof textPageConfig.loader> {
	return textPageConfig.loader(lessonId);
}

export async function textsLoader(): ReturnType<typeof api.texts.getTexts> {
	return api.texts.getTexts();
}

export async function deckLoader(deckId: string): ReturnType<typeof deckPageConfig.loader> {
	return deckPageConfig.loader(deckId);
}

export async function decksLoader(): ReturnType<typeof api.decks.getDecks> {
	return api.decks.getDecks();
}
