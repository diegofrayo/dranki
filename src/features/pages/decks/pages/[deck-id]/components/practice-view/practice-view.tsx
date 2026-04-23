"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { VoiceSettingsModal } from "~/components/common";
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
import { useRouter } from "~/features/router";
import { voiceSettingsStorage, type VoiceSettings } from "~/features/voice-settings";

import { useDeckSession } from "../../context/deck-session-context";
import PracticeCards from "./components/practice-cards";
import ProgressBar from "./components/progress-bar";

// --- COMPONENT DEFINITION ---

function PracticeView(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { deck, currentIndex, phrases, clearSession, setPhase } = useDeckSession();
	const router = useRouter();

	// --- STATES & REFS ---
	const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
	const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);

	// --- STYLES ---
	const classes = {
		root: "flex min-h-svh  flex-col bg-background",
		header: "border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md shrink-0",
		headerInner: "mx-auto flex max-w-xl items-center gap-3 px-4 py-3",
		backButton: "size-9 shrink-0",
		deckInfo: "min-w-0 flex-1",
		deckTitleRow: "flex items-center gap-2",
		deckEmoji: "text-xl",
		deckTitle: "text-foreground truncate text-base font-bold",
		progressWrapper: "mt-2",
		restartButton: "size-9",
		settingsButton: "size-9",
		main: "mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-4 min-h-0",
	};

	// --- HANDLERS ---
	function handleBackClick(): void {
		router.push(Routes.DECKS);
	}

	function handleRestartClick(): void {
		setIsRestartDialogOpen(true);
	}

	function handleRestartConfirm(): void {
		clearSession();
		setPhase("overview");
	}

	function handleRestartDialogOpenChange(open: boolean): void {
		setIsRestartDialogOpen(open);
	}

	function handleSettingsClick(): void {
		setVoiceSettingsOpen(true);
	}

	function handleVoiceSettingsClose(): void {
		setVoiceSettingsOpen(false);
	}

	function handleVoiceSettingsSave(settings: VoiceSettings): void {
		voiceSettingsStorage.set(settings);
		setVoiceSettingsOpen(false);
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

					<Box className="flex flex-col gap-1">
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

						<Button
							aria-label="Open voice settings"
							className={classes.settingsButton}
							variant={ButtonVariant.GHOST}
							onClick={handleSettingsClick}
						>
							<Icon name={IconCatalog.SETTINGS} />
						</Button>
					</Box>
				</Box>
			</Box>

			<Box
				as="main"
				className={classes.main}
			>
				<PracticeCards />
			</Box>

			<ConfirmationDialog
				open={isRestartDialogOpen}
				title="Restart deck?"
				description="This will reset your progress and take you back to the overview."
				confirmLabel="Restart"
				onConfirm={handleRestartConfirm}
				onOpenChange={handleRestartDialogOpenChange}
			/>

			{voiceSettingsOpen && (
				<VoiceSettingsModal
					onClose={handleVoiceSettingsClose}
					onSave={handleVoiceSettingsSave}
					visible
				/>
			)}
		</Box>
	);
}

export default PracticeView;
