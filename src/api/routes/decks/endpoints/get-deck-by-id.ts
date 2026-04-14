import type { Deck } from "~/api/types";

import getDeckPhrases from "./get-deck-phrases";
import getDecks from "./get-decks";

async function getDeckById(
	deckId: string,
	options?: { includePhrases: boolean },
): Promise<GetDeckByIdResponse> {
	const decks = await getDecks();
	const deck = decks.find((item) => item.id === deckId);

	if (options?.includePhrases && deck) {
		deck.phrases = await getDeckPhrases(deck.id);
	}

	return deck;
}

export default getDeckById;

// --- TYPES ---

export type GetDeckByIdResponse = Deck | undefined;
