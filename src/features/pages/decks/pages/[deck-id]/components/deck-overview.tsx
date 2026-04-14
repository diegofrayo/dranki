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
	Switch,
	Title,
} from "~/components/primitive";

import { useDeckSession } from "../context/deck-session-context";

function DeckOverview(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { deck, showTranslationByDefault, setShowTranslationByDefault, startSession } =
		useDeckSession();

	// --- STYLES ---
	const classes = {
		root: "animate-in fade-in-0 slide-in-from-bottom-4 flex flex-col gap-6 duration-500",
		deckCard: "overflow-hidden rounded-2xl shadow-lg bg-blue-700",
		deckCardHeader: "flex flex-col items-center gap-3 px-6 py-8",
		deckCardBody: "bg-card px-6 py-5",
		emoji: "flex h-20 w-20 items-center justify-center rounded-full text-4xl",
		title: "text-center text-2xl font-extrabold text-white",
		description: "text-center text-sm text-white/80",
		statsRow: "mt-4 flex items-center justify-center gap-1",
		statsText: "text-xs font-semibold text-white/70 uppercase tracking-wider",
		toggleRow: "flex items-center justify-between",
		toggleLabel: "text-foreground text-sm font-semibold",
		toggleDescription: "text-muted-foreground mt-0.5 text-xs",
		startButton:
			"h-14 w-full rounded-2xl text-base font-extrabold tracking-wide shadow-lg transition-transform active:scale-95",
	};

	// --- HANDLERS ---
	function handleTranslationToggleChange(checked: boolean): void {
		setShowTranslationByDefault(checked);
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
							<Paragraph className={classes.toggleLabel}>Show translation</Paragraph>
							<Paragraph className={classes.toggleDescription}>
								Show Spanish translation by default
							</Paragraph>
						</Box>
						<Switch
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
				onClick={handleStartClick}
			>
				Start Practice
			</Button>
		</Box>
	);
}

export default DeckOverview;
