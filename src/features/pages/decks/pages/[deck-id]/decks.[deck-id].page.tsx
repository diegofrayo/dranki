"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import { MainLayout } from "~/components/layout";
import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	InlineText,
	Text,
	Title,
} from "~/components/primitive";

type DeckPageProps = {
	deck: Deck;
};

function DeckPage({ deck }: DeckPageProps): ReactTypes.JSXElement {
	/*
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

	if (deck.phrases?.length === 0) {
		return (
			<Box className="flex min-h-screen items-center justify-center p-4">
				<Box className="text-center">
					<InlineText className="mb-4 block text-6xl">{deck.emoji}</InlineText>
					<Title
						as="h1"
						className="text-foreground mb-2 text-xl font-bold"
					>
						{deck.title}
					</Title>
					<Text className="text-muted-foreground">This deck has no phrases yet.</Text>
				</Box>
			</Box>
		);
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
		<MainLayout>
			<SetupScreen
				deck={deck}
				showTranslationByDefault={showTranslationByDefault}
				onStartClick={handleStartClick}
				onToggleTranslation={handleToggleTranslation}
			/>
		</MainLayout>
	);
  */

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

	console.log(isStarted);

	return (
		<MainLayout>
			<SetupScreen
				deck={deck}
				showTranslationByDefault={showTranslationByDefault}
				onStartClick={handleStartClick}
				onToggleTranslation={handleToggleTranslation}
			/>
		</MainLayout>
	);
}

export default DeckPage;

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
		root: "flex flex-col items-center justify-center h-full w-full",
		card: "w-full max-w-sm sm:max-w-none rounded-3xl p-8 shadow-xl",
		emojiContainer: "mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20",
		phraseCount: "mt-3 text-sm font-medium text-white/70",
		divider: "my-8 h-px w-full bg-white/20",
		toggleRow: "flex cursor-pointer items-center justify-center w-full gap-4",
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
				style={{ backgroundColor: deck.theme.backgroundColor || "#1d4ed8" }}
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
					{deck.phrases?.length} {deck.phrases?.length === 1 ? "phrase" : "phrases"}
				</Text>

				<Box className={classes.divider} />

				<Button
					className={classes.toggleRow}
					aria-pressed={showTranslationByDefault}
					variant={ButtonVariant.GHOST}
					onClick={onToggleTranslation}
				>
					<Text className={classes.toggleLabel}>Show translation by default</Text>
					<Box
						className={`${classes.toggleTrack} ${trackColor}`}
						aria-hidden="true"
					>
						<Box className={`${classes.toggleThumb} ${thumbTranslate}`} />
					</Box>
				</Button>

				<Button
					size={ButtonSize.LG}
					className={classes.startButton}
					variant={ButtonVariant.OUTLINE}
					onClick={onStartClick}
				>
					Start
				</Button>
			</Box>
		</Box>
	);
}
