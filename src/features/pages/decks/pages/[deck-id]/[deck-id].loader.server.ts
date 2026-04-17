import api, { type Deck } from "~/api";

export async function loader(deckId: string): Promise<{ deck: Deck | undefined }> {
	const deck = await api.decks.getDeckById(deckId, { includePhrases: true });

	return { deck };
}
