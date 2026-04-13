"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, ButtonSize, InlineText, Text, Title } from "~/components/primitive";
import { PracticeView } from "~/features/pages/decks/pages/[deck-id]/components/practice-view/practice-view";
import type { Deck } from "~/legacy/lib/types";

// --- TYPES ---

type SetupViewProps = {
	deck: Deck;
};

// --- COMPONENT DEFINITION ---

export function SetupView({ deck }: SetupViewProps): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [isStarted, setIsStarted] = useState(false);
	const [showTranslationByDefault, setShowTranslationByDefault] = useState(false);

	// --- HANDLERS ---
	function handleStartClick(): void {
		setIsStarted(true);
	}

	function handleToggleTranslation(): void {
		setShowTranslationByDefault((prev) => !prev);
	}

	if (isStarted) {
		return (
			<PracticeView
				deck={deck}
				showTranslationByDefault={showTranslationByDefault}
			/>
		);
	}

	return (
		<SetupScreen
			deck={deck}
			showTranslationByDefault={showTranslationByDefault}
			onStartClick={handleStartClick}
			onToggleTranslation={handleToggleTranslation}
		/>
	);
}

// --- COMPONENTS ---

type SetupScreenProps = {
	deck: Deck;
	showTranslationByDefault: boolean;
	onStartClick: () => void;
	onToggleTranslation: () => void;
};

function SetupScreen({
	deck,
	showTranslationByDefault,
	onStartClick,
	onToggleTranslation,
}: SetupScreenProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: "flex min-h-screen flex-col items-center justify-center p-6",
		card: "w-full max-w-sm rounded-3xl p-8 shadow-xl",
		emojiContainer: "mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20",
		phraseCount: "mt-3 text-sm font-medium text-white/70",
		divider: "my-8 h-px w-full bg-white/20",
		toggleRow: "flex cursor-pointer items-center justify-between gap-4",
		toggleLabel: "text-sm font-medium text-white",
		toggleTrack: "relative h-6 w-11 rounded-full transition-colors duration-200",
		toggleThumb:
			"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
		startButton: "mt-8 h-12 w-full font-bold text-base bg-white hover:bg-white/90",
	};

	const trackColor = showTranslationByDefault ? "bg-white/60" : "bg-white/20";
	const thumbTranslate = showTranslationByDefault ? "translate-x-5" : "translate-x-0.5";

	return (
		<Box className={classes.root}>
			<Box
				className={classes.card}
				style={{ backgroundColor: deck.color || "#1d4ed8" }}
			>
				<Box className={classes.emojiContainer}>
					<InlineText className="text-4xl">{deck.emoji}</InlineText>
				</Box>

				<Title
					as="h1"
					className="text-2xl font-bold text-white"
				>
					{deck.title}
				</Title>

				<Text className={classes.phraseCount}>
					{deck.phrases.length} {deck.phrases.length === 1 ? "phrase" : "phrases"}
				</Text>

				<Box className={classes.divider} />

				<button
					type="button"
					className={classes.toggleRow}
					onClick={onToggleTranslation}
					aria-pressed={showTranslationByDefault}
				>
					<Text className={classes.toggleLabel}>Show translation by default</Text>
					<Box
						className={`${classes.toggleTrack} ${trackColor}`}
						aria-hidden="true"
					>
						<Box className={`${classes.toggleThumb} ${thumbTranslate}`} />
					</Box>
				</button>

				<Button
					size={ButtonSize.LG}
					className={classes.startButton}
					onClick={onStartClick}
				>
					Start
				</Button>
			</Box>
		</Box>
	);
}
