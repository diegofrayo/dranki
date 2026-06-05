"use client";

import { useState } from "react";

import { sortBy } from "@diegofrayo-pkg/sort";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api/types";
import { DeckItem } from "~/components/common";
import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	Paragraph,
	Title,
} from "~/components/primitive";
import { useAuth } from "~/features/auth";

type DecksPageProps = {
	decks: Deck[];
};

export default function DecksPage({ decks }: DecksPageProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const auth = useAuth();

	// --- STATES & REFS ---
	const [sortField, setSortField] = useState<SortField>("createdAt");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

	// --- COMPUTED STATES ---
	const sortedDecks = sortDecks(decks, sortField, sortDirection);

	// --- HANDLERS ---
	function handleSortByTitleClick(): void {
		setSortField("title");
	}

	function handleSortByDateClick(): void {
		setSortField("createdAt");
	}

	function handleSortDirectionToggleClick(): void {
		setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
	}

	// --- UTILS ---
	function getButtonVariant(field: SortField): ButtonVariant {
		if (field === sortField) {
			return ButtonVariant.DEFAULT;
		}

		return ButtonVariant.OUTLINE;
	}

	return (
		<Box>
			<Box className="mb-6">
				<Title
					as="h2"
					className="text-foreground mb-1 text-xl font-bold"
				>
					Decks
				</Title>
				<Paragraph className="text-muted-foreground text-sm">
					Flashcard decks to help you memorize vocabulary and phrases. Practice each deck to build
					your English fluency through repetition.
				</Paragraph>
			</Box>
			<Box className="bg-muted border-border mb-4 flex items-center gap-2 rounded-sm border p-3">
				<Paragraph className="text-muted-foreground mr-1 text-sm">Sort by</Paragraph>
				<Button
					size={ButtonSize.SM}
					variant={getButtonVariant("title")}
					onClick={handleSortByTitleClick}
				>
					Title
				</Button>
				<Button
					size={ButtonSize.SM}
					variant={getButtonVariant("createdAt")}
					onClick={handleSortByDateClick}
				>
					Date
				</Button>
				<Button
					size={ButtonSize.ICON_SM}
					variant={ButtonVariant.GHOST}
					onClick={handleSortDirectionToggleClick}
				>
					<Icon name={sortDirection === "asc" ? IconCatalog.ARROW_UP : IconCatalog.ARROW_DOWN} />
				</Button>
			</Box>
			<Box
				as="section"
				className="flex flex-col gap-2"
			>
				{sortedDecks.map((deck) => {
					const isDeckPublic = deck.public === true;

					if (isDeckPublic || auth.status === "AUTHENTICATED") {
						return (
							<Box
								key={deck.id}
								className="relative"
							>
								<DeckItem
									deck={deck}
									showTotalPhrases
								/>
							</Box>
						);
					}

					return null;
				})}
			</Box>
		</Box>
	);
}

// --- UTILS ---

function sortDecks(decks: Deck[], field: SortField, direction: SortDirection): Deck[] {
	const computedField = ((direction === "asc" ? "" : "-") + field) as SortField;

	return [...decks].sort(sortBy(computedField));
}

// --- TYPES ---

type SortField = "title" | "createdAt" | "-title" | "-createdAt";

type SortDirection = "asc" | "desc";
