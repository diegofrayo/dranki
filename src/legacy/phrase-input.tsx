"use client";

import { X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Phrase } from "~/legacy/lib/types";

interface PhraseInputProps {
	phrase: Phrase;
	index: number;
	onChange: (index: number, field: "english" | "japanese", value: string) => void;
	onRemove: (index: number) => void;
	canRemove: boolean;
}

export function PhraseInput({ phrase, index, onChange, onRemove, canRemove }: PhraseInputProps) {
	return (
		<div className="bg-secondary/50 flex items-start gap-2 rounded-xl p-3">
			<div className="flex-1 space-y-2">
				<Input
					placeholder="English phrase"
					value={phrase.english}
					onChange={(e) => onChange(index, "english", e.target.value)}
					className="bg-background border-0 font-medium"
				/>
				<Input
					placeholder="Japanese translation"
					value={phrase.japanese}
					onChange={(e) => onChange(index, "japanese", e.target.value)}
					className="bg-background text-muted-foreground border-0"
				/>
			</div>
			{canRemove && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
					onClick={() => onRemove(index)}
					aria-label="Remove phrase"
				>
					<X className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
