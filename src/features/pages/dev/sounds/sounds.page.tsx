"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, InlineText, Paragraph, Title } from "~/components/primitive";
import { Sounds, useSound } from "~/features/sounds";

export default function SoundsPage(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const [playClickSound] = useSound(Sounds.CLICK);
	const [playSuccessSound] = useSound(Sounds.SUCCESS);
	const [playErrorSound] = useSound(Sounds.ERROR);
	const [playNotifySound] = useSound(Sounds.NOTIFY);
	const [playToggleOnSound] = useSound(Sounds.TOGGLE_ON);
	const [playToggleOffSound] = useSound(Sounds.TOGGLE_OFF);

	// --- STATES & REFS ---
	const [lastPlayed, setLastPlayed] = useState("");

	// --- STYLES ---
	const classes = {
		page: "min-h-screen p-6 bg-background",
		header: "mb-8",
		grid: "grid grid-cols-2 gap-4 sm:grid-cols-3",
		button: "h-20 flex-col gap-1 text-base font-semibold",
		buttonLabel: "text-xs font-normal",
		feedback: "mt-6 text-sm text-muted-foreground",
	};

	// --- HANDLERS ---
	function handleClickClick(): void {
		playClickSound();
		setLastPlayed("click");
	}

	function handleSuccessClick(): void {
		playSuccessSound();
		setLastPlayed("success");
	}

	function handleErrorClick(): void {
		playErrorSound();
		setLastPlayed("error");
	}

	function handleNotifyClick(): void {
		playNotifySound();
		setLastPlayed("notify");
	}

	function handleToggleOnClick(): void {
		playToggleOnSound();
		setLastPlayed("toggle(true)");
	}

	function handleToggleOffClick(): void {
		playToggleOffSound();
		setLastPlayed("toggle(false)");
	}

	return (
		<Box className={classes.page}>
			<Box className={classes.header}>
				<Title
					as="h1"
					className="text-foreground text-2xl font-bold"
				>
					Sounds
				</Title>
				<Paragraph className="text-muted-foreground mt-1 text-sm">
					Tap each button to preview a sound from SoundsService
				</Paragraph>
			</Box>

			<Box className={classes.grid}>
				<Button
					className={classes.button}
					variant="OUTLINE"
					onClick={handleClickClick}
				>
					👆
					<InlineText className={classes.buttonLabel}>click</InlineText>
				</Button>

				<Button
					className={classes.button}
					variant="OUTLINE"
					onClick={handleSuccessClick}
				>
					✅<InlineText className={classes.buttonLabel}>success</InlineText>
				</Button>

				<Button
					variant="OUTLINE"
					className={classes.button}
					onClick={handleErrorClick}
				>
					❌<InlineText className={classes.buttonLabel}>error</InlineText>
				</Button>

				<Button
					variant="OUTLINE"
					className={classes.button}
					onClick={handleNotifyClick}
				>
					🔔
					<InlineText className={classes.buttonLabel}>notify</InlineText>
				</Button>

				<Button
					variant="OUTLINE"
					className={classes.button}
					onClick={handleToggleOnClick}
				>
					🔛
					<InlineText className={classes.buttonLabel}>toggle(true)</InlineText>
				</Button>

				<Button
					className={classes.button}
					variant="OUTLINE"
					onClick={handleToggleOffClick}
				>
					🔴
					<InlineText className={classes.buttonLabel}>toggle(false)</InlineText>
				</Button>
			</Box>

			{lastPlayed.length > 0 && (
				<Paragraph className={classes.feedback}>
					Last played: <InlineText className="font-mono font-semibold">{lastPlayed}</InlineText>
				</Paragraph>
			)}
		</Box>
	);
}
