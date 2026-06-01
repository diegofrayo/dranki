import { useEffect, useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { DeckPhrase } from "~/api";
import { Box, Button, Icon } from "~/components/primitive";
import { Sounds, useSound } from "~/features/sounds";
import { useSpeechSynthesis } from "~/features/voice-settings";

import { useDeckSession } from "../../../context/deck-session-context";
import useDragGesture from "../hooks/use-drag-gesture";
import {
	ExplanationSection,
	getTtsIconName,
	SentenceSection,
	TranslationSection,
} from "./card-sections";

type SwipeableCardProps = {
	isCurrentCard: boolean;
	phrase: DeckPhrase;
	showCardExplanation: boolean;
	swipeEnabled: boolean;
	userAnswered: boolean;
};

function SwipeableCard({
	isCurrentCard,
	phrase,
	showCardExplanation,
	swipeEnabled,
	userAnswered,
}: SwipeableCardProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const {
		practiceMode,
		markPracticeMore,
		markRecognized,
		showSentenceByDefault,
		showTranslationByDefault,
		autoPlayAudio,
	} = useDeckSession();
	const { dragX, dragY, isDragging, isExiting, exitDirection, handlers } = useDragGesture({
		isEnabled: isCurrentCard && swipeEnabled,
		onSwipeLeft: () => markPracticeMore({ enableSounds: true }),
		onSwipeRight: () => markRecognized({ enableSounds: true }),
	});
	const { audioState, play, stop, toggle } = useSpeechSynthesis({ text: phrase.sentence });
	const [playClickSound] = useSound(Sounds.CLICK);

	// --- STATES & REFS ---
	const [isSentenceVisible, setIsSentenceVisible] = useState(showSentenceByDefault);
	const [isTranslationVisible, setIsTranslationVisible] = useState(showTranslationByDefault);
	const [isExplanationVisible, setIsExplanationVisible] = useState(false);
	const [wasCurrentOnMount] = useState(isCurrentCard);

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
	const cardStyles = {
		transform: cardTransform,
		transition: cardTransition,
		opacity: isCurrentCard ? Math.max(0.5, 1 - Math.abs(dragX) / 350) : 0.65,
		zIndex: isCurrentCard ? 10 : 5,
	};
	const isAudioLoading = audioState === "loading";
	const isAudioPlaying = audioState === "playing";

	// --- STYLES ---
	const classes = {
		container: cn(
			"absolute inset-0 touch-none select-none",
			isCurrentCard ? "cursor-grab" : "pointer-events-none",
			isDragging && "cursor-grabbing",
			isCurrentCard && wasCurrentOnMount && "animate-in fade-in-0 zoom-in-95 duration-300",
		),
		card: "absolute inset-0 flex flex-col overflow-hidden rounded-3xl shadow-xl bg-blue-600 text-white",
		practiceMoreIndicator: cn(
			"border-destructive text-destructive absolute top-6 left-6 z-20 -rotate-12 rounded-xl border-4 px-4 py-2 text-lg font-extrabold uppercase transition-opacity duration-150",
			dragX < -30 ? "opacity-100" : "opacity-0",
		),
		recognizedIndicator: cn(
			"border-primary text-primary absolute top-6 right-6 z-20 rotate-12 rounded-xl border-4 px-4 py-2 text-lg font-extrabold uppercase transition-opacity duration-150",
			dragX > 30 ? "opacity-100" : "opacity-0",
		),
		cardBody: "relative flex flex-1 flex-col items-center justify-center gap-6 p-8",
		ttsButton: cn(
			"absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 active:scale-95",
			audioState === "loading" && "cursor-not-allowed opacity-60",
		),
		showContentButton:
			"w-full rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/25 active:scale-95",
	};

	// --- HANDLERS ---
	function handleTtsClick(e: React.MouseEvent): void {
		e.stopPropagation();
		if (isAudioLoading) return;
		toggle();
	}

	function handleShowSentenceClick(): void {
		setIsSentenceVisible(true);
		playClickSound();
	}

	function handleShowTranslationClick(): void {
		setIsTranslationVisible(true);
		playClickSound();
	}

	function handleShowExplanationClick(): void {
		setIsExplanationVisible(true);
		playClickSound();
	}

	// --- EFFECTS ---
	useEffect(
		function autoPlayAudioOnMount() {
			if (!isCurrentCard || !autoPlayAudio) return;

			const timeoutId = setTimeout(play, 500);

			return (): void => clearTimeout(timeoutId);
		},
		[autoPlayAudio, isCurrentCard, play],
	);

	useEffect(
		function cancelAudioWhenCardIsNotCurrent() {
			if (!isCurrentCard) return;

			return (): void => stop();
		},
		[isCurrentCard, stop],
	);

	return (
		<Box
			className={classes.container}
			style={cardStyles}
			{...handlers}
		>
			<Box className={classes.card}>
				<Box className={classes.practiceMoreIndicator}>Practice more!</Box>
				<Box className={classes.recognizedIndicator}>Recognized!</Box>

				<Box className={classes.cardBody}>
					<Button
						className={classes.ttsButton}
						aria-label={isAudioPlaying ? "Stop audio" : "Play audio"}
						onClick={handleTtsClick}
					>
						<Icon
							name={getTtsIconName(audioState)}
							size={18}
							className={cn(isAudioLoading && "animate-spin")}
						/>
					</Button>

					<SentenceSection
						buttonClassName={classes.showContentButton}
						practiceMode={practiceMode}
						text={phrase.sentence}
						userAnswered={userAnswered}
						visible={isSentenceVisible}
						onClick={handleShowSentenceClick}
					/>
					<TranslationSection
						buttonClassName={classes.showContentButton}
						practiceMode={practiceMode}
						text={phrase.translation}
						userAnswered={userAnswered}
						visible={isTranslationVisible}
						onClick={handleShowTranslationClick}
					/>
					<ExplanationSection
						buttonClassName={classes.showContentButton}
						showCardExplanation={showCardExplanation}
						text={phrase.explanation}
						visible={isExplanationVisible}
						onClick={handleShowExplanationClick}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default SwipeableCard;
