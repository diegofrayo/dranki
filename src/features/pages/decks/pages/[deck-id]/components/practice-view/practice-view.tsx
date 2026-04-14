"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	ConfirmationDialog,
	Icon,
	IconCatalog,
	InlineText,
	Title,
} from "~/components/primitive";
import { Routes } from "~/constants";

import { useDeckSession } from "../../context/deck-session-context";
import PracticeCards from "./components/practice-cards";
import ProgressBar from "./components/progress-bar";

// --- COMPONENT DEFINITION ---

function PracticeView(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { deck, currentIndex, phrases, clearSession } = useDeckSession();
	const router = useRouter();

	// --- STATES & REFS ---
	const [isBackDialogOpen, setIsBackDialogOpen] = useState(false);
	const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);

	// --- STYLES ---
	const classes = {
		root: "flex min-h-screen flex-col bg-background",
		header: "border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md",
		headerInner: "mx-auto flex max-w-md items-center gap-3 px-4 py-3",
		backButton: "size-9 shrink-0",
		deckInfo: "min-w-0 flex-1",
		deckTitleRow: "flex items-center gap-2",
		deckEmoji: "text-xl",
		deckTitle: "text-foreground truncate text-base font-bold",
		progressWrapper: "mt-2",
		restartButton: "size-9 shrink-0",
		main: "mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-4",
	};

	// --- HANDLERS ---
	function handleBackClick(): void {
		setIsBackDialogOpen(true);
	}

	function handleBackConfirm(): void {
		clearSession();
		router.push(Routes.DECKS);
	}

	function handleBackDialogOpenChange(open: boolean): void {
		setIsBackDialogOpen(open);
	}

	function handleRestartClick(): void {
		setIsRestartDialogOpen(true);
	}

	function handleRestartConfirm(): void {
		clearSession();
	}

	function handleRestartDialogOpenChange(open: boolean): void {
		setIsRestartDialogOpen(open);
	}

	return (
		<Box className={classes.root}>
			<Box
				as="header"
				className={classes.header}
			>
				<Box className={classes.headerInner}>
					<Button
						variant={ButtonVariant.GHOST}
						size={ButtonSize.ICON}
						className={classes.backButton}
						aria-label="Go back"
						onClick={handleBackClick}
					>
						<Icon
							name={IconCatalog.ARROW_LEFT}
							size={20}
						/>
					</Button>

					<Box className={classes.deckInfo}>
						<Box className={classes.deckTitleRow}>
							<InlineText className={classes.deckEmoji}>{deck.emoji}</InlineText>
							<Title
								as="h1"
								className={classes.deckTitle}
							>
								{deck.title}
							</Title>
						</Box>
						<Box className={classes.progressWrapper}>
							<ProgressBar
								current={currentIndex}
								total={phrases.length}
							/>
						</Box>
					</Box>

					<Button
						variant={ButtonVariant.GHOST}
						size={ButtonSize.ICON}
						className={classes.restartButton}
						aria-label="Restart deck"
						onClick={handleRestartClick}
					>
						<Icon
							name={IconCatalog.ROTATE_CCW}
							size={18}
						/>
					</Button>
				</Box>
			</Box>

			<Box
				as="main"
				className={classes.main}
			>
				<PracticeCards />
			</Box>

			<ConfirmationDialog
				open={isBackDialogOpen}
				title="Leave practice?"
				description="Your progress will be lost and you'll be redirected to the decks page."
				confirmLabel="Leave"
				onConfirm={handleBackConfirm}
				onOpenChange={handleBackDialogOpenChange}
			/>

			<ConfirmationDialog
				open={isRestartDialogOpen}
				title="Restart deck?"
				description="This will reset your progress and take you back to the overview."
				confirmLabel="Restart"
				onConfirm={handleRestartConfirm}
				onOpenChange={handleRestartDialogOpenChange}
			/>
		</Box>
	);
}

export default PracticeView;
