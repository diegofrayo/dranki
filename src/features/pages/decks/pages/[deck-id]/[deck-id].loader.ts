import api from "~/api";
import type { Deck } from "~/api/types";

export async function loader(deckId: string): Promise<{ deck: Deck | undefined }> {
	const deck = await api.decks.getDeckById(deckId, { includePhrases: true });

	return { deck };
}
