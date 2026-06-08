"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	InlineText,
	Paragraph,
	Separator,
	Title,
} from "~/components/primitive";
import { Sounds, useSound } from "~/features/sounds";

import { useDeckSession, type PracticeMode } from "../../context/deck-session-context";
import PracticeModeButton, { PRACTICE_MODES } from "./components/practice-mode-button";
import Settings from "./components/settings";

function DeckOverview(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const [playToggleOnSound] = useSound(Sounds.TOGGLE_ON);
	const [playToggleOffSound] = useSound(Sounds.TOGGLE_OFF);
	const {
		deck,
		practiceMode,
		autoPlayAudio,
		showSentenceByDefault,
		showTranslationByDefault,
		setAutoPlayAudio,
		setPracticeMode,
		setShowSentenceByDefault,
		setShowTranslationByDefault,
		startSession,
	} = useDeckSession();

	// --- COMPUTED STATES ---
	const isEmptyDeck = deck.phrases.length === 0;
	const isCustomMode = practiceMode === "CUSTOM";

	// --- STYLES ---
	const classes = {
		root: "animate-in fade-in-0 slide-in-from-bottom-4 flex flex-col gap-6 duration-500",
		deckCard: "overflow-hidden rounded-2xl shadow-lg bg-blue-700",
		deckCardHeader: "flex flex-col items-center gap-3 px-6 py-8",
		deckCardBody: "bg-card px-6 py-5",
		emoji: "flex h-20 w-20 items-center justify-center rounded-full text-4xl bg-white/20",
		title: "text-center text-2xl font-extrabold text-white",
		description: "text-center text-sm text-white/80",
		statsRow: "mt-4 flex items-center justify-center gap-1",
		statsText: "text-xs font-semibold text-white/70 uppercase tracking-wider",
		modeSectionLabel: "text-foreground mb-2 text-xs font-semibold uppercase tracking-wider",
		modeGrid: "grid grid-cols-1 sm:grid-cols-2 gap-2",
		startButton:
			"h-14 w-full rounded-2xl text-base font-extrabold tracking-wide shadow-lg transition-transform active:scale-95",
	};

	// --- UTILS ---
	function playToggleSound(checked: boolean): void {
		if (checked) {
			playToggleOnSound();
		} else {
			playToggleOffSound();
		}
	}

	// --- HANDLERS ---
	function handlePracticeModeClick(mode: PracticeMode): void {
		setPracticeMode(mode);
	}

	function handleAutoPlayAudioToggleChange(checked: boolean): void {
		setAutoPlayAudio(checked);
		playToggleSound(checked);
	}

	function handleSentenceToggleChange(checked: boolean): void {
		setShowSentenceByDefault(checked);
		playToggleSound(checked);
	}

	function handleTranslationToggleChange(checked: boolean): void {
		setShowTranslationByDefault(checked);
		playToggleSound(checked);
	}

	function handleStartClick(): void {
		startSession();
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.deckCard}>
				<Box
					className={classes.deckCardHeader}
					style={{ backgroundColor: deck.theme.backgroundColor }}
				>
					<Box className={classes.emoji}>{deck.emoji}</Box>
					<Title
						as="h1"
						className={classes.title}
					>
						{deck.title}
					</Title>
					<Paragraph className={classes.description}>{deck.description}</Paragraph>
					<Box className={classes.statsRow}>
						<Icon
							name={IconCatalog.BOOK_OPEN}
							size={14}
							className="text-white/70"
						/>
						<InlineText className={classes.statsText}>{deck.totalPhrases} phrases</InlineText>
					</Box>
				</Box>

				{!isEmptyDeck && (
					<Box className={classes.deckCardBody}>
						<Paragraph className={classes.modeSectionLabel}>Practice Mode</Paragraph>
						<Box className={classes.modeGrid}>
							{PRACTICE_MODES.map((mode) => (
								<PracticeModeButton
									key={mode.id}
									description={mode.description}
									icon={mode.icon}
									id={mode.id}
									isSelected={practiceMode === mode.id}
									label={mode.label}
									onClick={handlePracticeModeClick}
								/>
							))}
						</Box>

						<Separator className="bg-border my-4" />

						<Settings
							autoPlayAudio={autoPlayAudio}
							isCustomMode={isCustomMode}
							showSentenceByDefault={showSentenceByDefault}
							showTranslationByDefault={showTranslationByDefault}
							onAutoPlayAudioChange={handleAutoPlayAudioToggleChange}
							onSentenceChange={handleSentenceToggleChange}
							onTranslationChange={handleTranslationToggleChange}
						/>
					</Box>
				)}
			</Box>

			<Button
				size={ButtonSize.LG}
				variant={ButtonVariant.DEFAULT}
				className={classes.startButton}
				disabled={isEmptyDeck}
				onClick={handleStartClick}
			>
				{isEmptyDeck ? "This deck does not have phrases." : "Start Practice"}
			</Button>
		</Box>
	);
}

export default DeckOverview;
