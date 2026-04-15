"use client";

import { useEffect } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	InlineText,
	Link,
	Paragraph,
	Title,
} from "~/components/primitive";
import { Routes } from "~/constants";

import { useDeckSession } from "../context/deck-session-context";

// --- COMPONENT DEFINITION ---

function ResultsScreen(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { deck, endTime, practiceMoreCount, recognizedCount, startTime, clearSession } =
		useDeckSession();

	// --- COMPUTED STATES ---
	const totalMinutes = computeTotalMinutes(startTime, endTime);
	const formattedStart = formatDateTime(startTime);
	const formattedEnd = formatDateTime(endTime);

	// --- STYLES ---
	const classes = {
		root: "animate-in fade-in-0 slide-in-from-bottom-6 flex flex-col items-center gap-8 py-4 duration-500",
		celebrationHeader: "flex flex-col items-center gap-4 text-center",
		trophyCircle:
			"flex h-24 w-24 items-center justify-center rounded-full shadow-lg animate-in zoom-in-50 duration-700 bg-blue-700",
		trophyIcon: "text-white",
		completeTitle: "text-foreground text-2xl font-extrabold",
		completeSubtitle: "text-muted-foreground text-sm",
		statsGrid: "grid w-full grid-cols-2 gap-3",
		statCard: "bg-card flex flex-col gap-1 rounded-2xl p-4 shadow-sm",
		statLabel: "text-muted-foreground text-xs font-semibold uppercase tracking-wider",
		statValue: "text-foreground text-base font-bold",
		recognizedCard:
			"bg-card col-span-1 flex flex-col items-center gap-1 rounded-2xl p-4 shadow-sm border-2 border-primary/30",
		practiceMoreCard:
			"bg-card col-span-1 flex flex-col items-center gap-1 rounded-2xl p-4 shadow-sm border-2 border-destructive/30",
		countValue: "text-3xl font-extrabold",
		countLabel: "text-xs font-semibold uppercase tracking-wider",
		recognizedCount: "text-primary",
		practiceMoreCount: "text-destructive",
		buttons: "flex w-full flex-col gap-3",
		restartButton: "h-12 w-full rounded-2xl font-bold",
		backButton: "h-12 w-full rounded-2xl",
	};

	// --- HANDLERS ---
	function handleRestartClick(): void {
		clearSession();
	}

	// --- EFFECTS ---
	useEffect(
		function clearSessionOnUnmount() {
			return (): void => {
				clearSession();
			};
		},
		[clearSession],
	);

	return (
		<Box className={classes.root}>
			<Box className={classes.celebrationHeader}>
				<Box
					className={classes.trophyCircle}
					style={{ backgroundColor: deck.theme.backgroundColor }}
				>
					<Icon
						name={IconCatalog.TROPHY}
						size={40}
						className={classes.trophyIcon}
					/>
				</Box>
				<Box>
					<Title
						as="h2"
						className={classes.completeTitle}
					>
						Session Complete! 🎉
					</Title>
					<Paragraph className={classes.completeSubtitle}>
						You&apos;ve reviewed all {deck.totalPhrases} phrases
					</Paragraph>
				</Box>
			</Box>

			<Box className={classes.statsGrid}>
				<Box className={classes.recognizedCard}>
					<Icon
						name={IconCatalog.CHECK}
						size={22}
						className="text-primary"
					/>
					<InlineText className={`${classes.countValue} ${classes.recognizedCount}`}>
						{recognizedCount}
					</InlineText>
					<InlineText className={`${classes.countLabel} ${classes.recognizedCount}`}>
						Recognized
					</InlineText>
				</Box>

				<Box className={classes.practiceMoreCard}>
					<Icon
						name={IconCatalog.ROTATE_CCW}
						size={22}
						className="text-destructive"
					/>
					<InlineText className={`${classes.countValue} ${classes.practiceMoreCount}`}>
						{practiceMoreCount}
					</InlineText>
					<InlineText className={`${classes.countLabel} ${classes.practiceMoreCount}`}>
						Practice more
					</InlineText>
				</Box>

				<Box className={classes.statCard}>
					<InlineText className={classes.statLabel}>Started</InlineText>
					<InlineText className={classes.statValue}>{formattedStart}</InlineText>
				</Box>

				<Box className={classes.statCard}>
					<InlineText className={classes.statLabel}>Finished</InlineText>
					<InlineText className={classes.statValue}>{formattedEnd}</InlineText>
				</Box>

				<Box className="col-span-2">
					<Box className={classes.statCard}>
						<Box className="flex items-center gap-2">
							<Icon
								name={IconCatalog.CLOCK}
								size={16}
								className="text-muted-foreground"
							/>
							<InlineText className={classes.statLabel}>Total time</InlineText>
						</Box>
						<InlineText className={classes.statValue}>{totalMinutes} min</InlineText>
					</Box>
				</Box>
			</Box>

			<Box className={classes.buttons}>
				<Button
					size={ButtonSize.LG}
					className={classes.restartButton}
					onClick={handleRestartClick}
				>
					<Icon
						name={IconCatalog.ROTATE_CCW}
						size={16}
					/>
					Practice Again
				</Button>
				<Link href={Routes.DECKS}>
					<Button
						variant={ButtonVariant.OUTLINE}
						size={ButtonSize.LG}
						className={classes.backButton}
					>
						Back to Decks
					</Button>
				</Link>
			</Box>
		</Box>
	);
}

export default ResultsScreen;

// --- UTILS ---

function formatDateTime(isoString: string): string {
	if (!isoString) return "—";
	const date = new Date(isoString);
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

function computeTotalMinutes(startIso: string, endIso: string): number {
	if (!startIso || !endIso) return 0;
	const diffMs = new Date(endIso).getTime() - new Date(startIso).getTime();
	return Math.max(1, Math.round(diffMs / 60000));
}
