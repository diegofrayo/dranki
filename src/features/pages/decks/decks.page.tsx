import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { DeckItem } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Paragraph, Title } from "~/components/primitive";

type DecksPageProps = {
	decks: Deck[];
};

export default function DecksPage({ decks }: DecksPageProps): ReactTypes.JSXElement {
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
				{decks.map((deck) => (
					<DeckItem
						key={deck.id}
						deck={deck}
					/>
				))}
			</Box>
		</MainLayout>
	);
}
