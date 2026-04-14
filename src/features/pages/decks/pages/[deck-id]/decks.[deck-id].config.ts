import type { Metadata } from "next";

import api, { type Deck } from "~/api";

async function generateMetadata(deckId: string): Promise<Metadata> {
	const deck = await api.decks.getDeckById(deckId);

	if (!deck) {
		return { title: "Deck not found - dranki" };
	}

	return {
		title: `${deck.emoji} ${deck.title} - dranki`,
		description: deck.description,
	};
}

async function loader(deckId: string): Promise<{ deck: Deck | undefined }> {
	const deck = await api.decks.getDeckById(deckId, { includePhrases: true });

	return { deck };
}

export default {
	generateMetadata,
	loader,
};
