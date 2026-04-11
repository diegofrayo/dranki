"use client";

import { Box } from "~/components/primitive";
import type { Deck } from "~/legacy/lib/types";

import { DeckCard } from "./deck-card";
import { EmptyDecks } from "./empty-decks";

type DeckListProps = {
	decks: Deck[];
};

export function DeckList({ decks }: DeckListProps) {
	if (decks.length === 0) {
		return <EmptyDecks />;
	}

	return (
		<Box className="grid gap-4">
			{decks.map((deck) => (
				<DeckCard
					key={deck.id}
					deck={deck}
				/>
			))}
		</Box>
	);
}
