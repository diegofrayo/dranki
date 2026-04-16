import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import DecksPage from "~/features/pages/decks";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function DecksPageWrapper(): Promise<ReactTypes.JSXElement> {
	const decks = await api.decks.getDecks();

	return <DecksPage decks={decks} />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Decks") };
}
