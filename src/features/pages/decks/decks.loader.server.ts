import api, { type Deck } from "~/api";

export async function loader(): Promise<{ decks: Deck[] }> {
	const decks = await api.decks.getDecks();

	return { decks };
}
