import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, Paragraph } from "~/components/primitive";

import type { PracticeMode } from "../../../[deck-id].types";

// --- COMPONENTS ---

type PhraseProps = {
	className: string;
	text: string;
	visible: boolean;
	onClick: () => void;
};

export function Phrase({ className, text, visible, onClick }: PhraseProps): ReactTypes.JSXElement {
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

type TranslationProps = PhraseProps;

export function Translation({
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

type ExplanationProps = PhraseProps;

export function Explanation({
	className,
	text,
	visible,
	onClick,
}: ExplanationProps): ReactTypes.JSXElementNullable {
	// --- STYLES ---
	const classes = {
		wrapper: "animate-in fade-in-0 slide-in-from-bottom-2 duration-400 bg-white/20 p-4 rounded-lg",
		text: "text-center text-base font-medium text-white/80 italic",
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
					Tap to show explanation
				</Button>
			)}
		</Box>
	);
}

type SentenceSectionProps = {
	buttonClassName: string;
	practiceMode: PracticeMode;
	text: string;
	userAnswered: boolean;
	visible: boolean;
	onClick: () => void;
};

export function SentenceSection({
	buttonClassName,
	practiceMode,
	text,
	userAnswered,
	visible,
	onClick,
}: SentenceSectionProps): ReactTypes.JSXElementNullable {
	const renderButton =
		(practiceMode === "LISTENING" && userAnswered) ||
		(practiceMode === "VOCABULARY" && userAnswered) ||
		practiceMode === "REGULAR" ||
		practiceMode === "CUSTOM";

	if (!renderButton) return null;

	return (
		<Phrase
			className={buttonClassName}
			text={text}
			visible={visible || userAnswered}
			onClick={onClick}
		/>
	);
}

type TranslationSectionProps = {
	buttonClassName: string;
	practiceMode: PracticeMode;
	text: string;
	userAnswered: boolean;
	visible: boolean;
	onClick: () => void;
};

export function TranslationSection({
	buttonClassName,
	practiceMode,
	text,
	userAnswered,
	visible,
	onClick,
}: TranslationSectionProps): ReactTypes.JSXElementNullable {
	const renderButton =
		(practiceMode === "LISTENING" && userAnswered) ||
		practiceMode === "VOCABULARY" ||
		practiceMode === "REGULAR" ||
		practiceMode === "CUSTOM";

	if (!renderButton) return null;

	const isVisible =
		(practiceMode === "LISTENING" && userAnswered) ||
		practiceMode === "VOCABULARY" ||
		practiceMode === "REGULAR" ||
		(practiceMode === "CUSTOM" && visible);

	return (
		<Translation
			className={buttonClassName}
			text={text}
			visible={isVisible}
			onClick={onClick}
		/>
	);
}

type ExplanationSectionProps = {
	buttonClassName: string;
	showCardExplanation: boolean;
	text: string | undefined;
	visible: boolean;
	onClick: () => void;
};

export function ExplanationSection({
	buttonClassName,
	showCardExplanation,
	text,
	visible,
	onClick,
}: ExplanationSectionProps): ReactTypes.JSXElementNullable {
	if (showCardExplanation || !text) return null;

	return (
		<Explanation
			className={buttonClassName}
			text={text}
			visible={visible}
			onClick={onClick}
		/>
	);
}
