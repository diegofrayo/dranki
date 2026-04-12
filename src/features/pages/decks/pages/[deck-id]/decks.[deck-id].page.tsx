import { notFound } from "next/navigation";

import { Box, InlineText, Text, Title } from "~/components/primitive";

import type { DeckPageProps } from "./decks.[deck-id].types";

const getDeckBySlug = (slug: string) => {
	return {
		emoji: "",
		description: "",
		title: "",
		phrases: [],
		id: slug,
	};
};

export default async function DeckPage({ params }: DeckPageProps) {
	const { slug } = await params;
	const deck = await getDeckBySlug(slug);

	if (!deck) {
		return notFound();
	}

	if (deck.phrases.length === 0) {
		return (
			<Box className="flex min-h-screen items-center justify-center p-4">
				<Box className="text-center">
					<InlineText className="mb-4 block text-6xl">{deck.emoji}</InlineText>
					<Title
						as="h1"
						className="text-foreground mb-2 text-xl font-bold"
					>
						{deck.title}
					</Title>
					<Text className="text-muted-foreground">This deck has no phrases yet.</Text>
				</Box>
			</Box>
		);
	}

	return <Box>hello</Box>;
}
