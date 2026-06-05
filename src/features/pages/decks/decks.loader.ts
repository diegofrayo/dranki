import api from "~/api";
import type { Deck } from "~/api/types";

export async function loader(): Promise<{ decks: Deck[] }> {
	const decks = await api.decks.getDecks();

	return { decks };
}
