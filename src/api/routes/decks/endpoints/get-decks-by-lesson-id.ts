import type { Deck } from "../../../types";
import getDecks from "./get-decks";

async function getDecksByLessonId(lessonId: string): Promise<GetDecksByLessonIdResponse> {
	const decks = await getDecks();

	return decks.filter((deck) => deck.lesson?.id === lessonId);
}

export default getDecksByLessonId;

// --- TYPES ---

export type GetDecksByLessonIdResponse = Array<Deck>;
