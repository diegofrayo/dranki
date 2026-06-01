"use client";

import { useState } from "react";
import { stringSimilarity } from "string-similarity-js";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";
import { isEmptyString } from "@diegofrayo-pkg/validator";

import type { DeckPhrase } from "~/api";
import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	Input,
	Paragraph,
	type IconName,
} from "~/components/primitive";
import { Sounds, useSound } from "~/features/sounds";

import { useDeckSession } from "../../../context/deck-session-context";
import SwipeableCard from "./swipeable-card";

function PracticeCards(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { phrases, currentIndex, practiceMode, markRecognized, markPracticeMore } =
		useDeckSession();

	// --- STATES & REFS ---
	const [sentencesComparisonFeedback, setSentencesComparisonFeedback] =
		useState<SentencesComparisonFeedback>(null);

	// --- COMPUTED STATES ---
	const currentPhrase = phrases[currentIndex] as DeckPhrase;
	const nextPhrase = phrases[currentIndex + 1];
	const isInputMode = practiceMode === "LISTENING" || practiceMode === "VOCABULARY";
	const swipeEnabled = !isInputMode;
	const userAnswered = sentencesComparisonFeedback !== null;
	const showCardExplanation = (isInputMode && userAnswered) || !isInputMode;

	// --- STYLES ---
	const classes = {
		root: "flex flex-1 flex-col min-h-0 gap-4",
		cardArea: "relative flex-1",
		controls: cn("grid shrink-0 grid-cols-2 items-center justify-center gap-4"),
		recognizedButton:
			"h-16 flex-1 rounded-2xl border-2 border-primary text-primary transition-all active:scale-95 hover:bg-primary hover:text-primary-foreground",
		practiceMoreButton:
			"h-16 flex-1 rounded-2xl border-2 border-destructive text-destructive transition-all active:scale-95 hover:bg-destructive hover:text-destructive-foreground px-0",
	};

	// --- HANDLERS ---
	function handleRecognizedClick(): void {
		markRecognized({ enableSounds: true });
	}

	function handlePracticeMoreClick(): void {
		markPracticeMore({ enableSounds: true });
	}

	// --- RENDERS ---
	function renderSentenceInput(): ReactTypes.JSXElementNullable {
		if (!isInputMode) return null;

		return (
			<SentenceInput
				key={currentIndex}
				cardSentence={currentPhrase.sentence}
				sentencesComparisonFeedback={sentencesComparisonFeedback}
				userAnswered={userAnswered}
				setSentencesComparisonFeedback={setSentencesComparisonFeedback}
			/>
		);
	}

	function renderControls(): ReactTypes.JSXElementNullable {
		if (isInputMode) return null;

		return (
			<Box className={classes.controls}>
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
			</Box>
		);
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.cardArea}>
				{nextPhrase !== undefined && (
					<SwipeableCard
						key={`card-${currentIndex + 1}`}
						isCurrentCard={false}
						phrase={nextPhrase}
						swipeEnabled={swipeEnabled}
						showCardExplanation={showCardExplanation}
						userAnswered={userAnswered}
					/>
				)}
				{currentPhrase !== undefined && (
					<SwipeableCard
						key={`card-${currentIndex}`}
						isCurrentCard={true}
						phrase={currentPhrase}
						swipeEnabled={swipeEnabled}
						showCardExplanation={showCardExplanation}
						userAnswered={userAnswered}
					/>
				)}
			</Box>

			{renderSentenceInput()}
			{renderControls()}
		</Box>
	);
}

export default PracticeCards;

// --- COMPONENTS ---

type SentenceInputProps = {
	cardSentence: string;
	sentencesComparisonFeedback: SentencesComparisonFeedback;
	userAnswered: boolean;
	setSentencesComparisonFeedback: ReactTypes.SetState<SentencesComparisonFeedback>;
};

function SentenceInput({
	cardSentence,
	sentencesComparisonFeedback,
	userAnswered,
	setSentencesComparisonFeedback,
}: SentenceInputProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const [playSuccessSound] = useSound(Sounds.SUCCESS);
	const [playErrorSound] = useSound(Sounds.ERROR);
	const [playClickSound] = useSound(Sounds.CLICK);
	const { practiceMode, markRecognized, markPracticeMore } = useDeckSession();

	// --- STATES & REFS ---
	const [inputText, setInputText] = useState("");
	const [score, setScore] = useState(0);

	// --- COMPUTED STATES ---
	const SCORES = {
		HIGH: 0.9,
		MEDIUM: 0.75,
	};
	const isCheckButtonDisabled =
		sentencesComparisonFeedback === "CORRECT" || inputText.trim().length === 0;
	const isHighScore = score >= SCORES.HIGH;
	const isLowScore = score <= SCORES.MEDIUM;
	const isMediumScore = !isHighScore && !isLowScore;
	const inputLabel =
		practiceMode === "LISTENING" ? "Type what you hear…" : "Translate above sentence into English…";

	// --- STYLES ---
	const classes = {
		root: "flex shrink-0 flex-col gap-4",
		input: "h-12 text-base w-full",
		button: "h-12 shrink-0",
		feedback: cn(
			"animate-in fade-in-0 flex items-center gap-2 rounded-xl px-4 py-3 text-sm duration-200",
			{
				"bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300": isHighScore,
				"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300": isMediumScore,
				"bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300": isLowScore,
			},
		),
	};

	// --- HANDLERS ---
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setInputText(e.target.value);
	}

	function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
		if (e.key === "Enter") handleCheckClick();
	}

	function handleCheckClick(): void {
		if (isCheckButtonDisabled) return;

		const score = stringSimilarity(inputText.trim(), cardSentence.trim());
		setScore(score);

		if (score >= SCORES.MEDIUM) {
			playSuccessSound();
			setSentencesComparisonFeedback("CORRECT");
		} else {
			playErrorSound();
			setSentencesComparisonFeedback("INCORRECT");
		}
	}

	function handleNextClick(): void {
		if (sentencesComparisonFeedback === null) return;

		if (sentencesComparisonFeedback === "CORRECT") {
			markRecognized({ enableSounds: false });
		} else {
			markPracticeMore({ enableSounds: false });
		}

		setInputText("");
		setSentencesComparisonFeedback(null);
		playClickSound();
	}

	function handleSkipClick(): void {
		playErrorSound();
		setSentencesComparisonFeedback("INCORRECT");
	}

	// --- RENDERS ---
	function renderFeedback(): ReactTypes.JSXElementNullable {
		const getIcon = (): IconName => {
			if (score >= SCORES.HIGH) return IconCatalog.CHECK;
			if (score >= SCORES.MEDIUM) return IconCatalog.TRIANGLE_ALERT;
			return IconCatalog.X_MARK;
		};

		if (isEmptyString(inputText) || !userAnswered) return null;

		return (
			<Box className={classes.feedback}>
				<Icon
					name={getIcon()}
					size={36}
				/>
				<Box className="flex-1">
					<Paragraph>Your answer:</Paragraph>
					<Paragraph className="mt-1 text-xs font-bold break-all italic">
						&quot;{inputText}&quot;
					</Paragraph>
				</Box>
			</Box>
		);
	}

	function renderInput(): ReactTypes.JSXElementNullable {
		if (userAnswered) {
			return null;
		}

		return (
			<label>
				<Paragraph className="mb-1 text-sm font-bold">{inputLabel}</Paragraph>
				<Input
					autoFocus
					className={classes.input}
					value={inputText}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
				/>
			</label>
		);
	}

	function renderControls(): ReactTypes.JSXElement {
		if (userAnswered) {
			return (
				<Button
					size={ButtonSize.LG}
					className={classes.button}
					onClick={handleNextClick}
				>
					Next
				</Button>
			);
		}

		return (
			<Box className="grid grid-cols-2 gap-2">
				<Button
					size={ButtonSize.LG}
					className={classes.button}
					disabled={isCheckButtonDisabled}
					onClick={handleCheckClick}
				>
					Check
				</Button>
				<Button
					variant="DESTRUCTIVE"
					size={ButtonSize.LG}
					className={classes.button}
					onClick={handleSkipClick}
				>
					Skip
				</Button>
			</Box>
		);
	}

	return (
		<Box className={classes.root}>
			{renderFeedback()}
			{renderInput()}
			{renderControls()}
		</Box>
	);
}

// --- TYPES ---

type SentencesComparisonFeedback = "CORRECT" | "INCORRECT" | null;
