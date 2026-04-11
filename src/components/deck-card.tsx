"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { Deck } from "@/legacy/lib/types";
import { Button } from "@/components/ui/button";
import { deleteDeck } from "@/app/actions";
import { useState } from "react";

interface DeckCardProps {
	deck: Deck;
	onDelete?: () => void;
}

export function DeckCard({ deck, onDelete }: DeckCardProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const phraseCount = deck.phrases?.length || 0;

	const handleDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!confirm("Are you sure you want to delete this deck?")) return;

		setIsDeleting(true);
		const result = await deleteDeck(deck.id);
		if (result.success) {
			onDelete?.();
		} else {
			alert("Failed to delete deck");
			setIsDeleting(false);
		}
	};

	return (
		<Link
			href={`/deck/${deck.slug}`}
			className="block group"
		>
			<div
				className="relative overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
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
							<h3 className="font-bold text-lg text-white leading-tight text-balance">
								{deck.title}
							</h3>
							<p className="text-sm text-white/80 mt-0.5">
								{phraseCount} {phraseCount === 1 ? "phrase" : "phrases"}
							</p>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
						onClick={handleDelete}
						disabled={isDeleting}
						aria-label="Delete deck"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
				{deck.description && (
					<p className="mt-3 text-sm text-white/70 line-clamp-2">{deck.description}</p>
				)}
			</div>
		</Link>
	);
}
