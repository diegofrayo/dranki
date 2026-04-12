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

export async function generateMetadata({ params }: DeckPageProps) {
	const { slug } = await params;
	const deck = await getDeckBySlug(slug);

	if (!deck) {
		return { title: "Deck not found - dranki" };
	}

	return {
		title: `${deck.emoji} ${deck.title} - dranki`,
		description: deck.description || `Practice ${deck.phrases.length} English phrases`,
	};
}
