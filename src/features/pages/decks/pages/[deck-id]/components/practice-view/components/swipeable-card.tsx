import { useEffect, useRef, useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck, DeckPhrase } from "~/api";
import { Box, Button, Icon, IconCatalog, Paragraph } from "~/components/primitive";

import useDragGesture from "../hooks/use-drag-gesture";

type SwipeableCardProps = {
	autoPlayAudio: boolean;
	deckTheme: Deck["theme"];
	isCurrentCard: boolean;
	phrase: DeckPhrase;
	showSentenceByDefault: boolean;
	showTranslationByDefault: boolean;
	onPracticeMore: () => void;
	onRecognized: () => void;
};

function SwipeableCard({
	autoPlayAudio,
	deckTheme,
	isCurrentCard,
	phrase,
	showSentenceByDefault,
	showTranslationByDefault,
	onPracticeMore,
	onRecognized,
}: SwipeableCardProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { dragX, dragY, isDragging, isExiting, exitDirection, handlers } = useDragGesture({
		isEnabled: isCurrentCard,
		onSwipeLeft: onPracticeMore,
		onSwipeRight: onRecognized,
	});

	// --- STATES & REFS ---
	const [isSentenceVisible, setIsSentenceVisible] = useState(showSentenceByDefault);
	const [isTranslationVisible, setIsTranslationVisible] = useState(showTranslationByDefault);
	const [audioState, setAudioState] = useState<AudioState>("idle");
	const [wasCurrentOnMount] = useState(isCurrentCard);
	const utteranceRef = useRef<SpeechSynthesisUtterance>(null);

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

		if (audioState === "loading" || !utteranceRef.current) return;

		if (audioState === "playing") {
			speechSynthesis.cancel();
			setAudioState("idle");
			return;
		}

		setAudioState("loading");
		speechSynthesis.speak(utteranceRef.current);
	}

	function handleShowSentenceClick(): void {
		setIsSentenceVisible(true);
	}

	function handleShowTranslationClick(): void {
		setIsTranslationVisible(true);
	}

	// --- EFFECTS ---
	useEffect(
		function autoPlayAudioOnMount() {
			if (!isCurrentCard) return;

			const utterance = new SpeechSynthesisUtterance(phrase.sentence);
			utterance.lang = "en-US";

			utterance.onstart = (): void => {
				setAudioState("playing");
			};
			utterance.onend = (): void => {
				setAudioState("idle");
			};
			utterance.onerror = (): void => {
				setAudioState("idle");
			};

			utteranceRef.current = utterance;

			if (autoPlayAudio) {
				setTimeout(() => speechSynthesis.speak(utterance), 500);
			}
		},
		[autoPlayAudio, isCurrentCard, phrase.sentence],
	);

	useEffect(
		function cancelAudioOnUnmount() {
			return (): void => {
				if (!isCurrentCard) return;

				speechSynthesis.cancel();
			};
		},
		[isCurrentCard],
	);

	return (
		<Box
			className={classes.container}
			style={cardStyles}
			{...handlers}
		>
			<Box
				className={classes.card}
				style={{ backgroundColor: deckTheme.backgroundColor, color: deckTheme.fontColor }}
			>
				<Box className={classes.practiceMoreIndicator}>Practice more!</Box>
				<Box className={classes.recognizedIndicator}>Recognized!</Box>

				<Box className={classes.cardBody}>
					<Button
						className={classes.ttsButton}
						aria-label={audioState === "playing" ? "Stop audio" : "Play audio"}
						onClick={handleTtsClick}
					>
						<Icon
							name={getTtsIconName(audioState)}
							size={18}
							className={audioState === "loading" ? "animate-spin" : ""}
						/>
					</Button>

					<Phrase
						className={classes.showContentButton}
						text={phrase.sentence}
						visible={isSentenceVisible}
						onClick={handleShowSentenceClick}
					/>

					<Translation
						className={classes.showContentButton}
						text={phrase.translation}
						visible={isTranslationVisible}
						onClick={handleShowTranslationClick}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default SwipeableCard;

// --- TYPES ---

type AudioState = "idle" | "loading" | "playing";

// --- COMPONENTS ---

type PhraseProps = {
	className: string;
	text: string;
	visible: boolean;
	onClick: () => void;
};

function Phrase({ className, text, visible, onClick }: PhraseProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		text: "text-center text-2xl leading-relaxed font-bold text-white md:text-3xl text-balance",
	};

	return (
		<Box className="w-full">
			{visible ? (
				<Paragraph className={classes.text}>{text}</Paragraph>
			) : (
				<Button
					className={className}
					onClick={onClick}
				>
					Tap to show sentence
				</Button>
			)}
		</Box>
	);
}

type TranslationProps = {
	className: string;
	text: string;
	visible: boolean;
	onClick: () => void;
};

function Translation({
	className,
	text,
	visible,
	onClick,
}: TranslationProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		wrapper: "animate-in fade-in-0 slide-in-from-bottom-2 duration-400",
		text: "text-center text-lg font-medium text-white/80",
	};

	return (
		<Box className="w-full">
			{visible ? (
				<Box className={classes.wrapper}>
					<Paragraph className={classes.text}>{text}</Paragraph>
				</Box>
			) : (
				<Button
					className={className}
					onClick={onClick}
				>
					Tap to show translation
				</Button>
			)}
		</Box>
	);
}

// --- UTILS ---

function getTtsIconName(state: AudioState): keyof typeof IconCatalog {
	if (state === "playing") return IconCatalog.SQUARE;
	return IconCatalog.VOLUME_2;
}
