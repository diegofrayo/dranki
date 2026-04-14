"use client";

import cn from "@diegofrayo-pkg/cn";
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
	Title,
} from "~/components/primitive";

import { useDeckSession } from "../context/deck-session-context";

// --- COMPONENT DEFINITION ---

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
		emoji: "flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-md bg-blue-600",
		title: "text-center text-2xl font-extrabold text-white",
		description: "text-center text-sm text-white/80",
		statsRow: "mt-4 flex items-center justify-center gap-1",
		statsText: "text-xs font-semibold text-white/70 uppercase tracking-wider",
		toggleRow: "flex items-center justify-between",
		toggleLabel: "text-foreground text-sm font-semibold",
		toggleDescription: "text-muted-foreground mt-0.5 text-xs",
		toggleTrack: cn(
			"focus-visible:ring-ring relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
		),
		toggleThumb:
			"inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
		startButton:
			"h-14 w-full rounded-2xl text-base font-extrabold tracking-wide shadow-lg transition-transform active:scale-95",
	};

	// --- HANDLERS ---
	function handleToggleChange(): void {
		setShowTranslationByDefault(!showTranslationByDefault);
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
					<Box
						className={classes.emoji}
						style={{ backgroundColor: `${deck.theme.backgroundColor}cc` }}
					>
						{deck.emoji}
					</Box>
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
						<button
							type="button"
							role="switch"
							aria-checked={showTranslationByDefault}
							onClick={handleToggleChange}
							className={cn(
								classes.toggleTrack,
								showTranslationByDefault ? "bg-primary" : "bg-muted",
							)}
						>
							<InlineText
								className={cn(
									classes.toggleThumb,
									showTranslationByDefault ? "translate-x-6" : "translate-x-1",
								)}
							/>
						</button>
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
