import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { MainLayout } from "~/components/layout";
import { Box, Link, Text, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type DecksPageProps = {
	decks: Deck[];
};

export default async function DecksPage({ decks }: DecksPageProps): Promise<ReactTypes.JSXElement> {
	return (
		<MainLayout>
			<Box className="mb-6">
				<Title
					as="h2"
					className="text-foreground mb-1 text-xl font-bold"
				>
					Decks
				</Title>
				<Text className="text-muted-foreground text-sm">
					Flashcard decks to help you memorize vocabulary and phrases. Practice each deck to build
					your English fluency through repetition.
				</Text>
			</Box>
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{decks.map((deck) => (
					<Link
						key={deck.id}
						href={Routes.DECK(deck.id)}
						className="block rounded-2xl bg-blue-600 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
					>
						{deck.emoji.length > 0 && <Text className="mb-1 text-3xl">{deck.emoji}</Text>}
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{deck.title}
						</Title>
						<Text className="mt-1 text-right text-sm text-white/80 italic">
							{deck.totalPhrases} phrases
						</Text>
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}
