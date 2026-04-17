import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type DeckItemProps = {
	deck: Deck;
};

export default function DeckItem({ deck }: DeckItemProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		link: "block rounded-2xl bg-blue-600 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
		emoji: "mb-1 text-3xl",
		title: "text-lg font-bold text-white",
		footer: "mt-1 text-right text-sm text-white/80 italic",
	};

	return (
		<Link
			href={Routes.DECK(deck.id)}
			className={classes.link}
			style={{ backgroundColor: deck.theme.backgroundColor, color: deck.theme.fontColor }}
		>
			<Paragraph className={classes.emoji}>{deck.emoji}</Paragraph>
			<Title
				as="h3"
				className={classes.title}
			>
				{deck.title}
			</Title>
			<Paragraph className={classes.footer}>{deck.totalPhrases} phrases</Paragraph>
		</Link>
	);
}
