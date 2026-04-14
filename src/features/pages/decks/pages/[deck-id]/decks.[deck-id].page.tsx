"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { MainLayout } from "~/components/layout";
import { Paragraph } from "~/components/primitive";

type DeckPageProps = {
	deck: Deck;
};

function DeckPage({ deck }: DeckPageProps): ReactTypes.JSXElement {
	console.log(deck);

	return (
		<MainLayout>
			<Paragraph>Hello world</Paragraph>
		</MainLayout>
	);
}

export default DeckPage;
