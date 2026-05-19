"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { DeckItem } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Icon, IconCatalog, Paragraph, Title } from "~/components/primitive";
import { useAuth } from "~/features/auth";

type DecksPageProps = {
	decks: Deck[];
};

export default function DecksPage({ decks }: DecksPageProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const auth = useAuth();

	return (
		<MainLayout>
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
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{decks.map((deck) => {
					const isDeckPublic = deck.public === true;

					if (isDeckPublic || auth.status === "authenticated") {
						return (
							<Box
								key={deck.id}
								className="relative"
							>
								<DeckItem
									deck={deck}
									showTotalPhrases
								/>
								{!isDeckPublic && (
									<Icon
										name={IconCatalog.LOCK}
										className="absolute top-1.5 right-2 fill-amber-500 text-amber-300"
									/>
								)}
							</Box>
						);
					}

					return null;
				})}
			</Box>
		</MainLayout>
	);
}
