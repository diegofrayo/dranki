"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	InlineText,
	Link,
	Text,
	Title,
} from "~/components/primitive";
import { SwipeableCard } from "~/features/pages/decks/pages/[deck-id]/components/swipeable-card";
import type { Deck, Phrase } from "~/legacy/lib/types";

import Progress from "../progress";
import { shuffleArray } from "./practice-view.utils";

// --- COMPONENT DEFINITION ---

type PracticeViewProps = {
	deck: Deck;
	showTranslationByDefault: boolean;
};

export function PracticeView({
	deck,
	showTranslationByDefault,
}: PracticeViewProps): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [phrases, setPhrases] = useState<Phrase[]>(() => shuffleArray(deck.phrases));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [knewCount, setKnewCount] = useState(0);
	const [studyMoreCount, setStudyMoreCount] = useState(0);

	// --- COMPUTED STATES ---
	const isComplete = currentIndex >= phrases.length;
	const progress = phrases.length > 0 ? (currentIndex / phrases.length) * 100 : 0;

	// --- HANDLERS ---
	function handleSwipeRight(): void {
		setKnewCount((c) => c + 1);
		setCurrentIndex((i) => i + 1);
	}

	function handleSwipeLeft(): void {
		setStudyMoreCount((c) => c + 1);
		setCurrentIndex((i) => i + 1);
	}

	function handleRestart(): void {
		setPhrases(shuffleArray(deck.phrases));
		setCurrentIndex(0);
		setKnewCount(0);
		setStudyMoreCount(0);
	}

	return (
		<Box className="bg-background flex min-h-screen flex-col">
			<Box
				as="header"
				className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md"
			>
				<Box className="mx-auto max-w-md px-4 py-3">
					<Box className="flex items-center gap-3">
						<Link href="/">
							<Button
								variant={ButtonVariant.GHOST}
								size={ButtonSize.ICON}
								className="h-9 w-9"
								aria-label="Back to decks"
							>
								<Icon
									name={IconCatalog.ARROW_LEFT}
									size={20}
								/>
							</Button>
						</Link>
						<Box className="min-w-0 flex-1">
							<Box className="flex items-center gap-2">
								<InlineText
									className="text-xl"
									role="img"
									aria-label="deck icon"
								>
									{deck.emoji}
								</InlineText>
								<Title
									as="h1"
									className="text-foreground truncate font-bold"
								>
									{deck.title}
								</Title>
							</Box>
							<Box className="mt-1.5">
								<Progress
									value={progress}
									className="h-2"
								/>
							</Box>
						</Box>
						<InlineText className="text-muted-foreground text-sm font-medium tabular-nums">
							{currentIndex}/{phrases.length}
						</InlineText>
					</Box>
				</Box>
			</Box>

			<Box
				as="main"
				className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-6"
			>
				{isComplete ? (
					<CompletionScreen
						deck={deck}
						knewCount={knewCount}
						phrasesCount={phrases.length}
						studyMoreCount={studyMoreCount}
						onRestart={handleRestart}
					/>
				) : (
					<PracticeCards
						currentIndex={currentIndex}
						deck={deck}
						phrases={phrases}
						showTranslationByDefault={showTranslationByDefault}
						onSwipeLeft={handleSwipeLeft}
						onSwipeRight={handleSwipeRight}
					/>
				)}
			</Box>
		</Box>
	);
}

// --- COMPONENTS ---

type CompletionScreenProps = {
	deck: Deck;
	knewCount: number;
	phrasesCount: number;
	studyMoreCount: number;
	onRestart: () => void;
};

function CompletionScreen({
	deck,
	knewCount,
	phrasesCount,
	studyMoreCount,
	onRestart,
}: CompletionScreenProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: "flex flex-1 flex-col items-center justify-center px-4 text-center",
		emojiContainer: "mb-6 flex h-24 w-24 items-center justify-center rounded-full",
		stats: "mb-8 flex gap-8",
		statItem: "text-center",
		knewStatValue: "flex items-center justify-center gap-2 text-primary",
		studyMoreStatValue: "flex items-center justify-center gap-2 text-destructive",
		statCount: "text-3xl font-bold",
		statLabel: "mt-1 text-sm text-muted-foreground",
		buttons: "flex w-full max-w-xs flex-col gap-3",
	};

	return (
		<Box className={classes.root}>
			<Box
				className={classes.emojiContainer}
				style={{ backgroundColor: deck.color }}
			>
				<InlineText className="text-5xl">{deck.emoji}</InlineText>
			</Box>
			<Title
				as="h2"
				className="text-foreground mb-2 text-2xl font-bold"
			>
				Session Complete!
			</Title>
			<Text className="text-muted-foreground mb-8">
				You&apos;ve reviewed all {phrasesCount} phrases
			</Text>

			<Box className={classes.stats}>
				<Box className={classes.statItem}>
					<Box className={classes.knewStatValue}>
						<Icon
							name={IconCatalog.CHECK}
							size={20}
						/>
						<InlineText className={classes.statCount}>{knewCount}</InlineText>
					</Box>
					<Text className={classes.statLabel}>Knew it</Text>
				</Box>
				<Box className={classes.statItem}>
					<Box className={classes.studyMoreStatValue}>
						<Icon
							name={IconCatalog.X_MARK}
							size={20}
						/>
						<InlineText className={classes.statCount}>{studyMoreCount}</InlineText>
					</Box>
					<Text className={classes.statLabel}>Study more</Text>
				</Box>
			</Box>

			<Box className={classes.buttons}>
				<Button
					size={ButtonSize.LG}
					className="h-12 font-bold"
					onClick={onRestart}
				>
					<Icon
						name={IconCatalog.ROTATE_CCW}
						size={16}
					/>
					Practice Again
				</Button>
				<Link
					href="/"
					className="w-full"
				>
					<Button
						variant={ButtonVariant.OUTLINE}
						size={ButtonSize.LG}
						className="h-12 w-full"
					>
						Back to Decks
					</Button>
				</Link>
			</Box>
		</Box>
	);
}

type PracticeCardsProps = {
	currentIndex: number;
	deck: Deck;
	phrases: Phrase[];
	showTranslationByDefault: boolean;
	onSwipeLeft: () => void;
	onSwipeRight: () => void;
};

function PracticeCards({
	currentIndex,
	deck,
	phrases,
	showTranslationByDefault,
	onSwipeLeft,
	onSwipeRight,
}: PracticeCardsProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		controls: "flex items-center justify-center gap-6 py-6",
		studyMoreButton:
			"h-16 w-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-white",
		knewItButton:
			"h-16 w-16 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white",
	};

	return (
		<>
			<Box className="relative min-h-100 flex-1">
				{phrases.slice(currentIndex, currentIndex + 2).map((phrase, idx) => (
					<SwipeableCard
						key={`${currentIndex + idx}-${phrase.english}`}
						phrase={phrase}
						deckColor={deck.color}
						showTranslationByDefault={showTranslationByDefault}
						onSwipeLeft={onSwipeLeft}
						onSwipeRight={onSwipeRight}
						isTop={idx === 0}
					/>
				))}
			</Box>

			<Box className={classes.controls}>
				<Button
					variant={ButtonVariant.OUTLINE}
					size={ButtonSize.LG}
					className={classes.studyMoreButton}
					aria-label="Study more"
					onClick={onSwipeLeft}
				>
					<Icon
						name={IconCatalog.X_MARK}
						size={28}
					/>
				</Button>
				<Button
					variant={ButtonVariant.OUTLINE}
					size={ButtonSize.LG}
					className={classes.knewItButton}
					aria-label="Knew it"
					onClick={onSwipeRight}
				>
					<Icon
						name={IconCatalog.CHECK}
						size={28}
					/>
				</Button>
			</Box>
		</>
	);
}
