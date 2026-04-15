"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, ButtonSize, ButtonVariant, Icon, IconCatalog } from "~/components/primitive";

import { useDeckSession } from "../../../context/deck-session-context";
import SwipeableCard from "./swipeable-card";

function PracticeCards(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const {
		deck,
		phrases,
		currentIndex,
		markRecognized,
		markPracticeMore,
		autoPlayAudio,
		showSentenceByDefault,
		showTranslationByDefault,
	} = useDeckSession();

	// --- COMPUTED STATES ---
	const currentPhrase = phrases[currentIndex];
	const nextPhrase = phrases[currentIndex + 1];

	// --- STYLES ---
	const classes = {
		root: "flex flex-1 flex-col",
		cardArea: "relative flex-1",
		controls: "flex items-center justify-center gap-4 py-5",
		recognizedButton:
			"h-16 flex-1 rounded-2xl border-2 border-primary text-primary transition-all active:scale-95 hover:bg-primary hover:text-primary-foreground",
		practiceMoreButton:
			"h-16 flex-1 rounded-2xl border-2 border-destructive text-destructive transition-all active:scale-95 hover:bg-destructive hover:text-destructive-foreground",
	};

	// --- HANDLERS ---
	function handleRecognizedClick(): void {
		markRecognized();
	}

	function handlePracticeMoreClick(): void {
		markPracticeMore();
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.cardArea}>
				{nextPhrase !== undefined && (
					<SwipeableCard
						key={`next-${currentIndex + 1}`}
						autoPlayAudio={autoPlayAudio}
						deckTheme={deck.theme}
						isCurrentCard={false}
						phrase={nextPhrase}
						showSentenceByDefault={showSentenceByDefault}
						showTranslationByDefault={showTranslationByDefault}
						onPracticeMore={markPracticeMore}
						onRecognized={markRecognized}
					/>
				)}
				{currentPhrase !== undefined && (
					<SwipeableCard
						key={`top-${currentIndex}`}
						autoPlayAudio={autoPlayAudio}
						deckTheme={deck.theme}
						isCurrentCard={true}
						phrase={currentPhrase}
						showSentenceByDefault={showSentenceByDefault}
						showTranslationByDefault={showTranslationByDefault}
						onPracticeMore={markPracticeMore}
						onRecognized={markRecognized}
					/>
				)}
			</Box>

			<Box className={classes.controls}>
				<Button
					variant={ButtonVariant.OUTLINE}
					size={ButtonSize.LG}
					className={classes.recognizedButton}
					aria-label="Recognized"
					onClick={handleRecognizedClick}
				>
					<Icon
						name={IconCatalog.CHECK}
						size={20}
					/>
					Recognized
				</Button>
				<Button
					variant={ButtonVariant.OUTLINE}
					size={ButtonSize.LG}
					className={classes.practiceMoreButton}
					aria-label="Practice more"
					onClick={handlePracticeMoreClick}
				>
					<Icon
						name={IconCatalog.ROTATE_CCW}
						size={20}
					/>
					Practice more
				</Button>
			</Box>
		</Box>
	);
}

export default PracticeCards;
