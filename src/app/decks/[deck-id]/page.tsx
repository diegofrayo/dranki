import { notFound, redirect } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import { Routes } from "~/constants";
import { getUser } from "~/features/auth/actions/get-user";
import DeckPage from "~/features/pages/decks/pages/[deck-id]";
import { loader } from "~/features/pages/decks/pages/[deck-id]/[deck-id].loader";
import { generateMetadataDeckPage } from "~/features/pages/decks/pages/[deck-id]/[deck-id].metadata";

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

	const isPrivateText = !deck.public;
	const isUserLoggedIn = !!(await getUser());
	const shouldProtectRoute = isPrivateText && !isUserLoggedIn;

	if (shouldProtectRoute) {
		return redirect(Routes.DECKS);
	}

	return <DeckPage deck={deck} />;
}

export async function generateMetadata({
	params,
}: DeckPageProps): ReturnType<typeof generateMetadataDeckPage> {
	const deckId = (await params)["deck-id"];
	const deck = await api().decks.getDeckById(deckId);

	return generateMetadataDeckPage(deck);
}

export async function generateStaticParams(): Promise<Array<{ "deck-id": string }>> {
	const decks = await api().decks.getDecks();

	return decks.slice(0, 5).map((deck) => ({
		"deck-id": deck.id,
	}));
}
