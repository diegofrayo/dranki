import type { Metadata } from "next";

import api, { type Deck } from "~/api";
import { composePageTitle } from "~/utils/misc";

async function generateMetadata(deckId: string): Promise<Metadata> {
	const deck = await api.decks.getDeckById(deckId);

	if (!deck) {
		return { title: composePageTitle("Deck not found") };
	}

	return {
		title: composePageTitle(`${deck.emoji} ${deck.title}`),
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
