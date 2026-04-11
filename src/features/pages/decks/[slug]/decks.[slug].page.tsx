import { notFound } from "next/navigation";

import type { DeckPageProps } from "./decks.[slug].types";

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
		notFound();
	}

	if (deck.phrases.length === 0) {
		return (
			<div className="flex min-h-screen items-center justify-center p-4">
				<div className="text-center">
					<span className="mb-4 block text-6xl">{deck.emoji}</span>
					<h1 className="text-foreground mb-2 text-xl font-bold">{deck.title}</h1>
					<p className="text-muted-foreground">This deck has no phrases yet.</p>
				</div>
			</div>
		);
	}

	return <div>hello</div>;
}
