import type { Deck } from "~/api";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export async function generateMetadataDeckPage(deck: Deck | undefined): Promise<Metadata> {
	if (!deck) {
		return { title: composePageTitle("Deck not found") };
	}

	return {
		title: composePageTitle(`${deck.emoji} ${deck.title}`),
		description: deck.description,
	};
}
