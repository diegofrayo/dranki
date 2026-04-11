"use client";

import { Box, InlineText, Link, Text, Title } from "~/components/primitive";
import type { Deck } from "~/legacy/lib/types";

type DeckCardProps = {
	deck: Deck;
};

export function DeckCard({ deck }: DeckCardProps) {
	// --- COMPUTED STATES ---
	const phraseCount = deck.phrases?.length ?? 0;

	return (
		<Link
			href={`/deck/${deck.slug}`}
			className="group block"
		>
			<Box
				className="relative overflow-hidden rounded-2xl p-5 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
				style={{
					backgroundColor: deck.color,
					boxShadow: `0 4px 0 0 color-mix(in oklch, ${deck.color} 70%, black)`,
				}}
			>
				<Box className="flex items-start justify-between">
					<Box className="flex items-center gap-3">
						<InlineText
							className="text-4xl"
							role="img"
							aria-label="deck icon"
						>
							{deck.emoji}
						</InlineText>
						<Box>
							<Title
								as="h3"
								className="text-lg leading-tight font-bold text-balance text-white"
							>
								{deck.title}
							</Title>
							<Text className="mt-0.5 text-sm text-white/80">
								{phraseCount} {phraseCount === 1 ? "phrase" : "phrases"}
							</Text>
						</Box>
					</Box>
				</Box>
				{deck.description && (
					<Text className="mt-3 line-clamp-2 text-sm text-white/70">{deck.description}</Text>
				)}
			</Box>
		</Link>
	);
}
