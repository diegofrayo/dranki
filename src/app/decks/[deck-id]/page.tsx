import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import DeckPage, { pageConfig } from "~/features/pages/decks/pages/[deck-id]";

type DeckPageProps = {
	params: Promise<{ "deck-id": string }>;
};

export default async function DeckPageWrapper({
	params,
}: DeckPageProps): Promise<ReactTypes.JSXElement> {
	const deckId = (await params)["deck-id"];
	const { deck } = await pageConfig.loader(deckId);

	if (!deck) {
		return notFound();
	}

	return <DeckPage deck={deck} />;
}

export async function generateMetadata({
	params,
}: DeckPageProps): ReturnType<typeof pageConfig.generateMetadata> {
	const deckId = (await params)["deck-id"];
	return pageConfig.generateMetadata(deckId);
}
