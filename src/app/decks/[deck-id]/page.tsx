import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import DeckPage, {
	generateMetadata as generateMetadataImplementation,
} from "~/features/pages/decks/pages/[deck-id]";

type DeckPageProps = {
	params: Promise<{ "deck-id": string }>;
};

export default async function DeckPageWrapper({
	params,
}: DeckPageProps): Promise<ReactTypes.JSXElement> {
	const deckId = (await params)["deck-id"];
	const deck = await api.decks.getDeckById(deckId, { includePhrases: true });

	if (!deck) {
		return notFound();
	}

	return <DeckPage deck={deck} />;
}

export async function generateMetadata({
	params,
}: DeckPageProps): ReturnType<typeof generateMetadataImplementation> {
	const deckId = (await params)["deck-id"];
	return generateMetadataImplementation(deckId);
}
