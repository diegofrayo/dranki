"use client";

import { useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { DeckPhrase } from "~/api";
import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	Paragraph,
} from "~/components/primitive";

import { useDeckSession } from "../../../context/deck-session-context";
import useDragGesture from "./use-drag-gesture";

// --- COMPONENT DEFINITION ---

function PracticeCards(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const {
		deck,
		phrases,
		currentIndex,
		markRecognized,
		markPracticeMore,
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
						deckColor={deck.theme.backgroundColor}
						isTop={false}
						phrase={nextPhrase}
						showTranslationByDefault={showTranslationByDefault}
						onPracticeMore={markPracticeMore}
						onRecognized={markRecognized}
					/>
				)}
				{currentPhrase !== undefined && (
					<SwipeableCard
						key={`top-${currentIndex}`}
						deckColor={deck.theme.backgroundColor}
						isTop={true}
						phrase={currentPhrase}
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

// --- SUB-COMPONENTS ---

type SwipeableCardProps = {
	deckColor: string;
	isTop: boolean;
	phrase: DeckPhrase;
	showTranslationByDefault: boolean;
	onPracticeMore: () => void;
	onRecognized: () => void;
};

function SwipeableCard({
	deckColor,
	isTop,
	phrase,
	showTranslationByDefault,
	onPracticeMore,
	onRecognized,
}: SwipeableCardProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { dragX, dragY, isDragging, isExiting, exitDirection, handlers } = useDragGesture({
		isEnabled: isTop,
		onSwipeLeft: onRecognized,
		onSwipeRight: onPracticeMore,
	});

	console.log(deckColor);

	// --- STATES & REFS ---
	const [isTranslationVisible, setIsTranslationVisible] = useState(showTranslationByDefault);
	const [isAudioPlaying, setIsAudioPlaying] = useState(false);

	// --- COMPUTED STATES ---
	const cardTransform = isExiting
		? exitDirection === "left"
			? "translateX(-130vw) rotate(-25deg)"
			: "translateX(130vw) rotate(25deg)"
		: `translateX(${dragX}px) translateY(${dragY}px) rotate(${dragX * 0.08}deg)`;

	const cardTransition = isExiting
		? "transform 0.3s ease-out"
		: isDragging
			? "none"
			: "transform 0.3s ease-out";

	// --- STYLES ---
	const classes = {
		container: cn(
			"absolute inset-0 touch-none select-none",
			isTop ? "cursor-grab" : "pointer-events-none",
			isDragging && "cursor-grabbing",
			isTop && "animate-in fade-in-0 zoom-in-95 duration-300",
		),
		card: "absolute inset-0 flex flex-col rounded-3xl shadow-xl overflow-hidden bg-blue-700",
		recognizedIndicator: cn(
			"border-primary text-primary absolute top-6 left-6 z-20 -rotate-12 rounded-xl border-4 px-4 py-2 text-lg font-extrabold uppercase transition-opacity duration-150",
			dragX < -30 ? "opacity-100" : "opacity-0",
		),
		practiceMoreIndicator: cn(
			"border-destructive text-destructive absolute top-6 right-6 z-20 rotate-12 rounded-xl border-4 px-4 py-2 text-lg font-extrabold uppercase transition-opacity duration-150",
			dragX > 30 ? "opacity-100" : "opacity-0",
		),
		cardBody: "relative flex flex-1 flex-col items-center justify-center gap-6 p-8",
		ttsButton:
			"absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 active:scale-95",
		phraseText:
			"text-center text-2xl leading-relaxed font-bold text-white md:text-3xl text-balance",
		showTranslationButton:
			"w-full rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/25 active:scale-95",
	};

	// --- HANDLERS ---
	function handleTtsClick(e: React.MouseEvent): void {
		e.stopPropagation();
		setIsAudioPlaying((prev) => !prev);

		if (isAudioPlaying) {
			speechSynthesis.cancel();
		} else {
			const utterance = new SpeechSynthesisUtterance(phrase.sentence);
			const voices = speechSynthesis.getVoices();

			utterance.lang = "en-US"; // or "es-ES"
			utterance.voice = voices.find((v) => v.lang === "en-US") || null;
			utterance.rate = 1; // speed
			utterance.pitch = 1; // tone

			speechSynthesis.speak(utterance);
		}
	}

	function handleShowTranslationClick(): void {
		setIsTranslationVisible(true);
	}

	return (
		<div
			className={classes.container}
			style={{
				transform: cardTransform,
				transition: cardTransition,
				opacity: isTop ? Math.max(0.5, 1 - Math.abs(dragX) / 350) : 0.65,
				zIndex: isTop ? 10 : 5,
			}}
			{...handlers}
		>
			<div
				className={classes.card}
				// style={{ backgroundColor: deckColor }}
			>
				<div className={classes.recognizedIndicator}>Recognized!</div>
				<div className={classes.practiceMoreIndicator}>Practice more!</div>

				<div className={classes.cardBody}>
					<button
						type="button"
						className={classes.ttsButton}
						aria-label={isAudioPlaying ? "Stop audio" : "Play audio"}
						onClick={handleTtsClick}
					>
						<Icon
							name={isAudioPlaying ? IconCatalog.SQUARE : IconCatalog.VOLUME_2}
							size={18}
						/>
					</button>

					<Paragraph className={classes.phraseText}>{phrase.sentence}</Paragraph>

					<Box className="w-full">
						{isTranslationVisible ? (
							<TranslationReveal translation={phrase.translation} />
						) : (
							<button
								type="button"
								className={classes.showTranslationButton}
								onClick={handleShowTranslationClick}
							>
								Tap to show translation
							</button>
						)}
					</Box>
				</div>
			</div>
		</div>
	);
}

// --- EXTRACTED COMPONENTS ---

type TranslationRevealProps = {
	translation: string;
};

function TranslationReveal({ translation }: TranslationRevealProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		wrapper: "animate-in fade-in-0 slide-in-from-bottom-2 duration-400",
		divider: "my-2 h-px w-full bg-white/20",
		text: "text-center text-lg font-medium text-white/80 ",
	};

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.divider} />
			<Paragraph className={classes.text}>{translation}</Paragraph>
		</Box>
	);
}
