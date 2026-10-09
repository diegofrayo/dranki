import type { Deck } from "~/api/types";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export function generateMetadataDeckPage(deck: Deck | undefined): Metadata {
	if (!deck) {
		return { title: composePageTitle("Deck not found") };
	}

	return {
		title: composePageTitle(`${deck.emoji} ${deck.title}`),
		description: deck.description,
	};
}
