import { notFound } from "next/navigation";
import { DeckPageProps } from "./decks.[slug].types";

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
			<div className="min-h-screen flex items-center justify-center p-4">
				<div className="text-center">
					<span className="text-6xl mb-4 block">{deck.emoji}</span>
					<h1 className="text-xl font-bold text-foreground mb-2">{deck.title}</h1>
					<p className="text-muted-foreground">This deck has no phrases yet.</p>
				</div>
			</div>
		);
	}

	return <div>hello</div>;
}
