"use client";

import { cn } from "@/legacy/lib/utils";

const DECK_EMOJIS = [
	"📚",
	"🎯",
	"💬",
	"🗣️",
	"✈️",
	"🍽️",
	"💼",
	"🏠",
	"🎬",
	"🎵",
	"🏥",
	"🛒",
	"💡",
	"🌟",
	"🔥",
	"💪",
	"🎉",
	"❤️",
];

interface EmojiPickerProps {
	value: string;
	onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
	return (
		<div className="grid grid-cols-6 gap-2">
			{DECK_EMOJIS.map((emoji) => (
				<button
					key={emoji}
					type="button"
					className={cn(
						"w-10 h-10 rounded-lg text-2xl flex items-center justify-center transition-all duration-200",
						value === emoji
							? "bg-primary/20 ring-2 ring-primary scale-110"
							: "bg-secondary hover:bg-secondary/80 hover:scale-105",
					)}
					onClick={() => onChange(emoji)}
					aria-label={`Select emoji ${emoji}`}
					aria-pressed={value === emoji}
				>
					{emoji}
				</button>
			))}
		</div>
	);
}
