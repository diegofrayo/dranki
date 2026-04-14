import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MainLayout } from "~/components/layout";
import { Box, Link, Text, Title } from "~/components/primitive";
import decksData from "~/data/decks.json";
import lessonsData from "~/data/lessons.json";

type DeckItem = {
	id: string;
	title: string;
	description: string;
	emoji: string;
	lesson_id: string;
	created_at: string;
	theme: { backgroundColor: string; fontColor: string };
	totalPhrases: number;
};

export default async function DecksPage(): Promise<ReactTypes.JSXElement> {
	const decks = (decksData as DeckItem[]).map((deck) => {
		const lessonInfo = lessonsData.find((lesson) => lesson.id === deck.id);

		if (lessonInfo) {
			return {
				...deck,
				title: deck.title || lessonInfo.title,
				description: deck.description || lessonInfo.description,
				emoji: deck.emoji || lessonInfo.emoji,
			};
		}

		return deck;
	});

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
						href={`/decks/${deck.id}`}
						className="block rounded-2xl bg-blue-400 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
					>
						{deck.emoji.length > 0 && <Text className="mb-1 text-3xl">{deck.emoji}</Text>}
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{deck.title}
						</Title>
						{deck.totalPhrases > 0 && (
							<Text className="mt-1 text-right text-sm text-white/80 italic">
								{deck.totalPhrases} phrases
							</Text>
						)}
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}
