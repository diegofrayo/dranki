"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Phrase } from "@/legacy/lib/types";

interface PhraseInputProps {
	phrase: Phrase;
	index: number;
	onChange: (index: number, field: "english" | "japanese", value: string) => void;
	onRemove: (index: number) => void;
	canRemove: boolean;
}

export function PhraseInput({ phrase, index, onChange, onRemove, canRemove }: PhraseInputProps) {
	return (
		<div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-xl">
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
					className="bg-background border-0 text-muted-foreground"
				/>
			</div>
			{canRemove && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
					onClick={() => onRemove(index)}
					aria-label="Remove phrase"
				>
					<X className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
