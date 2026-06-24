import { useEffect, useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { DeckPhrase } from "~/api/types";
import { Box, Button, Icon } from "~/components/primitive";
import { Sounds, useSound } from "~/features/sounds";
import { useSpeechSynthesis, type AudioState } from "~/features/voice-settings";

import { useDeckSession, type PracticeMode } from "../../../context/deck-session-context";
import useDragGesture from "../hooks/use-drag-gesture";
import { getTtsIconName } from "../utils";
import { ExplanationSection, SentenceSection, TranslationSection } from "./card-sections";

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
	const {
		practiceMode,
		audioState,
		dragX,
		isDragging,
		handlers,
		isAudioLoading,
		isAudioPlaying,
		isSentenceVisible,
		isTranslationVisible,
		isExplanationVisible,
		wasCurrentOnMount,
		cardStyles,
		handleTtsClick,
		handleShowSentenceClick,
		handleShowTranslationClick,
		handleShowExplanationClick,
	} = useSwipeableCard({ isCurrentCard, phrase, swipeEnabled });

	// --- STYLES ---
	const classes = {
		container: cn(
			"absolute inset-0 touch-none select-none",
			isCurrentCard ? "cursor-grab" : "pointer-events-none",
			isDragging && "cursor-grabbing",
			isCurrentCard && wasCurrentOnMount && "animate-in fade-in-0 zoom-in-95 duration-300",
		),
		card: "absolute inset-0 overflow-hidden rounded-3xl shadow-xl bg-blue-600 text-white py-18 px-6",
		swipeIndicators: cn("absolute top-3 right-0 left-0 z-20 mx-6 text-center"),
		practiceMoreIndicator: cn(
			"border-secondary bg-destructive text-secondary inline-flex rounded-xl border-4 px-4 py-2 text-lg font-extrabold uppercase transition-opacity duration-150",
			dragX < -30 ? "opacity-100" : "hidden opacity-0",
		),
		recognizedIndicator: cn(
			"border-secondary bg-primary text-secondary inline-flex rounded-xl border-4 px-4 py-2 text-lg font-extrabold uppercase transition-opacity duration-150",
			dragX > 30 ? "opacity-100" : "hidden opacity-0",
		),
		cardBody: "relative flex flex-col h-full overflow-auto",
		ttsButton: cn(
			"absolute top-4 right-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 active:scale-95",
			{ "cursor-not-allowed opacity-60": isAudioLoading },
		),
		ttsButtonIcon: cn(isAudioLoading && "animate-spin"),
		showContentButton:
			"w-full rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/25 active:scale-95",
	};

	return (
		<Box
			className={classes.container}
			style={cardStyles}
			{...handlers}
		>
			<Box className={classes.card}>
				<Box className={classes.swipeIndicators}>
					<Box className={classes.practiceMoreIndicator}>Practice more!</Box>
					<Box className={classes.recognizedIndicator}>Recognized!</Box>
				</Box>

				<Button
					className={classes.ttsButton}
					aria-label={isAudioPlaying ? "Stop audio" : "Play audio"}
					onClick={handleTtsClick}
				>
					<Icon
						name={getTtsIconName(audioState)}
						size={18}
						className={classes.ttsButtonIcon}
					/>
				</Button>

				<Box className={classes.cardBody}>
					<Box className="m-auto w-full space-y-6">
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
							explanation={phrase.explanation}
							visible={isExplanationVisible}
							onClick={handleShowExplanationClick}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default SwipeableCard;

// --- CONTROLLER ---

type UseSwipeableCardProps = {
	isCurrentCard: boolean;
	phrase: DeckPhrase;
	swipeEnabled: boolean;
};

type UseSwipeableCardReturn = {
	practiceMode: PracticeMode;
	audioState: AudioState;
	dragX: number;
	isDragging: boolean;
	handlers: {
		onTouchStart: (e: React.TouchEvent) => void;
		onTouchMove: (e: React.TouchEvent) => void;
		onTouchEnd: () => void;
		onMouseDown: (e: React.MouseEvent) => void;
		onMouseMove: (e: React.MouseEvent) => void;
		onMouseUp: () => void;
		onMouseLeave: () => void;
	};
	isAudioLoading: boolean;
	isAudioPlaying: boolean;
	isSentenceVisible: boolean;
	isTranslationVisible: boolean;
	isExplanationVisible: boolean;
	wasCurrentOnMount: boolean;
	cardStyles: ReactTypes.Styles;
	handleTtsClick: (e: React.MouseEvent) => void;
	handleShowSentenceClick: () => void;
	handleShowTranslationClick: () => void;
	handleShowExplanationClick: () => void;
};

function useSwipeableCard({
	isCurrentCard,
	phrase,
	swipeEnabled,
}: UseSwipeableCardProps): UseSwipeableCardReturn {
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
	const isAudioLoading = audioState === "LOADING";
	const isAudioPlaying = audioState === "PLAYING";

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

	return {
		practiceMode,
		audioState,
		dragX,
		isDragging,
		handlers,
		isAudioLoading,
		isAudioPlaying,
		isSentenceVisible,
		isTranslationVisible,
		isExplanationVisible,
		wasCurrentOnMount,
		cardStyles,
		handleTtsClick,
		handleShowSentenceClick,
		handleShowTranslationClick,
		handleShowExplanationClick,
	};
}
