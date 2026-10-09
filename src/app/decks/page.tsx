import type ReactTypes from "@diegofrayo-pkg/types/react";

import DecksPage from "~/features/pages/decks";
import { loader } from "~/features/pages/decks/decks.loader";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function DecksPageWrapper(): Promise<ReactTypes.JSXElement> {
	const { decks } = await loader();

	return <DecksPage decks={decks} />;
}

export function generateMetadata(): Metadata {
	return { title: composePageTitle("Decks") };
}
