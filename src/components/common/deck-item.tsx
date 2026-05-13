import cn from "@diegofrayo-pkg/cn";
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
		link: cn(
			"relative flex items-center gap-2 rounded-2xl bg-blue-600 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
		),
		emoji: cn("text-3xl"),
		title: cn("text-lg leading-none font-bold text-white"),
		footer: cn("absolute right-3 bottom-2 mt-1 text-right text-xs text-white/80 italic"),
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
