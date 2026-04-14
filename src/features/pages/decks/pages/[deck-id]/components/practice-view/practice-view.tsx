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
	Title,
} from "~/components/primitive";

import { useDeckSession } from "../../context/deck-session-context";
import PracticeCards from "./components/practice-cards";
import ProgressBar from "./components/progress-bar";

// --- COMPONENT DEFINITION ---

function PracticeView(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { deck, currentIndex, phrases } = useDeckSession();

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
		main: "mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-4",
	};

	// --- HANDLERS ---
	function handleBackClick(): void {
		if (typeof window !== "undefined") {
			window.history.back();
		}
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
				</Box>
			</Box>

			<Box
				as="main"
				className={classes.main}
			>
				<PracticeCards />
			</Box>
		</Box>
	);
}

export default PracticeView;
