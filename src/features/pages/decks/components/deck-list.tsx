"use client";

import type { Deck } from "~/legacy/lib/types";

import { DeckCard } from "./deck-card";
import { EmptyDecks } from "./empty-decks";

interface DeckListProps {
	decks: Deck[];
}

export function DeckList({ decks }: DeckListProps) {
	if (decks.length === 0) {
		return <EmptyDecks />;
	}

	return (
		<div className="grid gap-4">
			{decks.map((deck) => (
				<DeckCard
					key={deck.id}
					deck={deck}
				/>
			))}
		</div>
	);
}
