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
	Title,
} from "~/components/primitive";
import type { Deck, Phrase } from "~/legacy/lib/types";

import CompletionScreen from "./components/completion-screen";
import PracticeCards from "./components/practice-cards";
import Progress from "./components/progress";

// --- COMPONENT DEFINITION ---

type PracticeViewProps = {
	deck: Deck;
	showTranslationByDefault: boolean;
};

export default function PracticeView({
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

// --- UTILS ---

export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		if (shuffled[i] !== undefined && shuffled[j] !== undefined) {
			shuffled[i] = shuffled[j];
			// @ts-expect-error idk
			shuffled[j] = shuffled[i];
		}
	}

	return shuffled;
}
