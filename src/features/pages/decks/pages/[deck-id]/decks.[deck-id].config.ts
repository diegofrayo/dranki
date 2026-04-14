import type { Metadata } from "next";

import api from "~/api";

export async function generateMetadata(deckId: string): Promise<Metadata> {
	const deck = await api.decks.getDeckById(deckId);

	if (!deck) {
		return { title: "Deck not found - dranki" };
	}

	return {
		title: `${deck.emoji} ${deck.title} - dranki`,
		description: deck.description,
	};
}
