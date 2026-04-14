import type ReactTypes from "@diegofrayo-pkg/types/react";

import api from "~/api";
import DecksPage from "~/features/pages/decks";

export default async function DecksPageWrapper(): Promise<ReactTypes.JSXElement> {
	const decks = await api.decks.getDecks();

	return <DecksPage decks={decks} />;
}
