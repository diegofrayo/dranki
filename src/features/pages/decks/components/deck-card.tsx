"use client";

import Link from "next/link";

import type { Deck } from "~/legacy/lib/types";

interface DeckCardProps {
	deck: Deck;
}

export function DeckCard({ deck }: DeckCardProps) {
	const phraseCount = deck.phrases?.length || 0;

	return (
		<Link
			href={`/deck/${deck.slug}`}
			className="group block"
		>
			<div
				className="relative overflow-hidden rounded-2xl p-5 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
				style={{
					backgroundColor: deck.color,
					boxShadow: `0 4px 0 0 color-mix(in oklch, ${deck.color} 70%, black)`,
				}}
			>
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<span
							className="text-4xl"
							role="img"
							aria-label="deck icon"
						>
							{deck.emoji}
						</span>
						<div>
							<h3 className="text-lg leading-tight font-bold text-balance text-white">
								{deck.title}
							</h3>
							<p className="mt-0.5 text-sm text-white/80">
								{phraseCount} {phraseCount === 1 ? "phrase" : "phrases"}
							</p>
						</div>
					</div>
				</div>
				{deck.description && (
					<p className="mt-3 line-clamp-2 text-sm text-white/70">{deck.description}</p>
				)}
			</div>
		</Link>
	);
}
