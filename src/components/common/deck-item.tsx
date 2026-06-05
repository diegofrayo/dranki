import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api/types";
import { Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type DeckItemProps = {
	deck: Deck;
	showTotalPhrases?: boolean;
};

export default function DeckItem({ deck, showTotalPhrases }: DeckItemProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		link: cn(
			"relative flex items-center justify-between gap-2 rounded-2xl bg-blue-600 px-3 py-2 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
			{ "bg-blue-800": !deck.public },
		),
		emoji: cn("text-base"),
		title: cn("flex-1 truncate text-base font-bold text-white"),
		footer: cn("text-right text-xs text-white/80 italic"),
	};

	// --- RENDERS ---
	function renderFooter(): ReactTypes.JSXElement | null {
		if (showTotalPhrases) {
			return <Paragraph className={classes.footer}>{deck.totalPhrases} phrases</Paragraph>;
		}

		return <Paragraph className={classes.footer}>Deck</Paragraph>;
	}

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
			{renderFooter()}
		</Link>
	);
}
