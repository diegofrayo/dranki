"use client";

import { useRouter } from "next/navigation";

import { DeckCard } from "~/components/deck-card";
import { EmptyDecks } from "~/components/empty-decks";
import type { Deck } from "~/legacy/lib/types";

interface DeckListProps {
	decks: Deck[];
}

export function DeckList({ decks }: DeckListProps) {
	const router = useRouter();

	const handleDelete = () => {
		router.refresh();
	};

	if (decks.length === 0) {
		return <EmptyDecks />;
	}

	return (
		<div className="grid gap-4">
			{decks.map((deck) => (
				<DeckCard
					key={deck.id}
					deck={deck}
					onDelete={handleDelete}
				/>
			))}
		</div>
	);
}
