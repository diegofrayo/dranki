import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import DeckPage from "~/features/pages/decks/pages/[deck-id]";
import { loader } from "~/features/pages/decks/pages/[deck-id]/decks.[deck-id].loader.server";
import { generateMetadataDeckPage } from "~/features/pages/decks/pages/[deck-id]/decks.[deck-id].metadata";

type DeckPageProps = {
	params: Promise<{ "deck-id": string }>;
};

export default async function DeckPageWrapper({
	params,
}: DeckPageProps): Promise<ReactTypes.JSXElement> {
	const deckId = (await params)["deck-id"];
	const { deck } = await loader(deckId);

	if (!deck) {
		return notFound();
	}

	return <DeckPage deck={deck} />;
}

export async function generateMetadata({
	params,
}: DeckPageProps): ReturnType<typeof generateMetadataDeckPage> {
	const deckId = (await params)["deck-id"];
	const deck = await api.decks.getDeckById(deckId);

	return generateMetadataDeckPage(deck);
}
