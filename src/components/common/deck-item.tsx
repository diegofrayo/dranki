import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api/types";
import { InlineText, Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type DeckItemProps = {
	deck: Deck;
	variant?: "DEFAULT" | "FROM_LESSON";
};

export default function DeckItem({ deck, variant }: DeckItemProps): ReactTypes.JSXElement {
	// --- COMPUTED STATES ---
	const isFromLessonVariant = variant === "FROM_LESSON";

	// --- STYLES ---
	const classes = {
		link: cn(
			"relative flex items-center justify-between gap-2 rounded-2xl bg-blue-600 px-3 py-3 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
			{ "bg-blue-800": !deck.public },
			{ "h-30 flex-col items-start justify-center gap-1 px-3": isFromLessonVariant },
		),
		emoji: cn("text-base", { "text-2xl": isFromLessonVariant }),
		title: cn("flex-1 text-base font-bold text-white", { truncate: !isFromLessonVariant }),
		footer: cn("text-right text-xs text-white/80 italic", { "self-end": isFromLessonVariant }),
	};

	return (
		<Link
			href={Routes.DECK(deck.id)}
			className={classes.link}
			style={{ backgroundColor: deck.theme.backgroundColor, color: deck.theme.fontColor }}
		>
			{isFromLessonVariant && (
				<InlineText className="absolute top-2 right-2 rounded-md bg-white/20 px-2 py-1 text-xs font-bold">
					Deck
				</InlineText>
			)}
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
