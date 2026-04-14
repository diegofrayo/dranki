"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck } from "~/api";
import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	InlineText,
	Link,
	Text,
	Title,
} from "~/components/primitive";

type CompletionScreenProps = {
	deck: Deck;
	knewCount: number;
	phrasesCount: number;
	studyMoreCount: number;
	onRestart: () => void;
};

export default function CompletionScreen({
	deck,
	knewCount,
	phrasesCount,
	studyMoreCount,
	onRestart,
}: CompletionScreenProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: "flex flex-1 flex-col items-center justify-center px-4 text-center",
		emojiContainer: "mb-6 flex h-24 w-24 items-center justify-center rounded-full",
		stats: "mb-8 flex gap-8",
		statItem: "text-center",
		knewStatValue: "flex items-center justify-center gap-2 text-primary",
		studyMoreStatValue: "flex items-center justify-center gap-2 text-destructive",
		statCount: "text-3xl font-bold",
		statLabel: "mt-1 text-sm text-muted-foreground",
		buttons: "flex w-full max-w-xs flex-col gap-3",
	};

	return (
		<Box className={classes.root}>
			<Box
				className={classes.emojiContainer}
				style={{ backgroundColor: deck.theme.backgroundColor }}
			>
				<InlineText className="text-5xl">{deck.emoji}</InlineText>
			</Box>
			<Title
				as="h2"
				className="text-foreground mb-2 text-2xl font-bold"
			>
				Session Complete!
			</Title>
			<Text className="text-muted-foreground mb-8">
				You&apos;ve reviewed all {phrasesCount} phrases
			</Text>

			<Box className={classes.stats}>
				<Box className={classes.statItem}>
					<Box className={classes.knewStatValue}>
						<Icon
							name={IconCatalog.CHECK}
							size={20}
						/>
						<InlineText className={classes.statCount}>{knewCount}</InlineText>
					</Box>
					<Text className={classes.statLabel}>Knew it</Text>
				</Box>
				<Box className={classes.statItem}>
					<Box className={classes.studyMoreStatValue}>
						<Icon
							name={IconCatalog.X_MARK}
							size={20}
						/>
						<InlineText className={classes.statCount}>{studyMoreCount}</InlineText>
					</Box>
					<Text className={classes.statLabel}>Study more</Text>
				</Box>
			</Box>

			<Box className={classes.buttons}>
				<Button
					size={ButtonSize.LG}
					className="h-12 font-bold"
					onClick={onRestart}
				>
					<Icon
						name={IconCatalog.ROTATE_CCW}
						size={16}
					/>
					Practice Again
				</Button>
				<Link
					href="/"
					className="w-full"
				>
					<Button
						variant={ButtonVariant.OUTLINE}
						size={ButtonSize.LG}
						className="h-12 w-full"
					>
						Back to Decks
					</Button>
				</Link>
			</Box>
		</Box>
	);
}
