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
	Switch,
	Title,
} from "~/components/primitive";
import { sounds } from "~/utils/sounds";

import { useDeckSession } from "../context/deck-session-context";

function DeckOverview(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const {
		deck,
		autoPlayAudio,
		showSentenceByDefault,
		showTranslationByDefault,
		setAutoPlayAudio,
		setShowSentenceByDefault,
		setShowTranslationByDefault,
		startSession,
	} = useDeckSession();

	// --- COMPUTED STATES ---
	const isEmptyDeck = deck.phrases.length === 0;

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
		toggleRow: "flex items-center justify-between gap-3",
		toggleLabel: "text-foreground text-sm font-semibold",
		toggleDescription: "text-muted-foreground mt-0.5 text-xs",
		startButton:
			"h-14 w-full rounded-2xl text-base font-extrabold tracking-wide shadow-lg transition-transform active:scale-95",
	};

	// --- HANDLERS ---
	function handleAutoPlayAudioToggleChange(checked: boolean): void {
		setAutoPlayAudio(checked);
		sounds.toggle(checked);
	}

	function handleSentenceToggleChange(checked: boolean): void {
		setShowSentenceByDefault(checked);
		sounds.toggle(checked);
	}

	function handleTranslationToggleChange(checked: boolean): void {
		setShowTranslationByDefault(checked);
		sounds.toggle(checked);
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

				<Box className={classes.deckCardBody}>
					<Box className={classes.toggleRow}>
						<Box>
							<Paragraph className={classes.toggleLabel}>Auto-play audio</Paragraph>
							<Paragraph className={classes.toggleDescription}>
								Play phrase audio automatically when a card appears
							</Paragraph>
						</Box>
						<Switch
							className="shrink-0"
							checked={autoPlayAudio}
							onCheckedChange={handleAutoPlayAudioToggleChange}
						/>
					</Box>
					<Separator className="bg-border my-4 h-px" />
					<Box className={classes.toggleRow}>
						<Box>
							<Paragraph className={classes.toggleLabel}>Show sentence</Paragraph>
							<Paragraph className={classes.toggleDescription}>
								Show sentence by default (disable for listening training)
							</Paragraph>
						</Box>
						<Switch
							className="shrink-0"
							checked={showSentenceByDefault}
							onCheckedChange={handleSentenceToggleChange}
						/>
					</Box>
					<Separator className="bg-border my-4 h-px" />
					<Box className={classes.toggleRow}>
						<Box>
							<Paragraph className={classes.toggleLabel}>Show translation</Paragraph>
							<Paragraph className={classes.toggleDescription}>
								Show Spanish translation by default
							</Paragraph>
						</Box>
						<Switch
							className="shrink-0"
							checked={showTranslationByDefault}
							onCheckedChange={handleTranslationToggleChange}
						/>
					</Box>
				</Box>
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
