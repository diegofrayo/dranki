"use client";

import { useEffect, useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, Icon, IconCatalog, InlineText } from "~/components/primitive";
import { useSpeechSynthesis } from "~/hooks";

type SelectionAudioBarProps = {
	containerRef: ReactTypes.Ref<HTMLDivElement | null>;
};

function SelectionAudioBar({
	containerRef,
}: SelectionAudioBarProps): ReactTypes.JSXElementNullable {
	// --- STATES & REFS ---
	const [selectedText, setSelectedText] = useState("");
	const [isDismissed, setIsDismissed] = useState(false);

	// --- HOOKS ---
	const { isPlaying, stop, toggle } = useSpeechSynthesis({ text: selectedText });

	// --- COMPUTED STATES ---
	const isVisible = selectedText.length > 0 && !isDismissed;

	// --- STYLES ---
	const classes = {
		container: cn(
			"border-border bg-background fixed inset-x-0 bottom-0 z-40 border-t shadow-lg",
			"animate-in slide-in-from-bottom-4 duration-200",
		),
		text: "text-foreground line-clamp-2 flex-1 text-sm",
	};

	// --- HANDLERS ---
	function handleTogglePlayClick(): void {
		toggle();
	}

	function handleHideClick(): void {
		stop();
		setIsDismissed(true);
		setSelectedText("");

		const selection = window.getSelection();
		if (selection) {
			selection.removeAllRanges();
		}
	}

	// --- EFFECTS ---
	useEffect(
		function trackSelection() {
			function handleSelectionChange(): void {
				const selection = window.getSelection();
				if (!selection || selection.isCollapsed) return;

				const text = selection.toString().trim();
				if (text.length === 0) return;

				const container = containerRef.current;
				const anchorNode = selection.anchorNode;
				const focusNode = selection.focusNode;
				if (
					!container ||
					!anchorNode ||
					!focusNode ||
					!container.contains(anchorNode) ||
					!container.contains(focusNode)
				) {
					return;
				}

				setSelectedText(text);
				setIsDismissed(false);
			}

			document.addEventListener("selectionchange", handleSelectionChange);

			return (): void => {
				document.removeEventListener("selectionchange", handleSelectionChange);
			};
		},
		[containerRef],
	);

	if (!isVisible) return null;

	return (
		<Box
			className={classes.container}
			role="toolbar"
			aria-label="Selected text audio controls"
		>
			<Box className="mx-auto flex w-full max-w-xl items-center gap-2 p-4">
				<InlineText className={classes.text}>{selectedText}</InlineText>
				<Button
					variant="SECONDARY"
					size="ICON_SM"
					aria-label={isPlaying ? "Stop audio" : "Play selected text"}
					onClick={handleTogglePlayClick}
				>
					<Icon
						name={isPlaying ? IconCatalog.SQUARE : IconCatalog.VOLUME_2}
						size={18}
					/>
				</Button>
				<Button
					variant="GHOST"
					size="ICON_SM"
					aria-label="Hide audio bar"
					onClick={handleHideClick}
				>
					<Icon
						name={IconCatalog.X_MARK}
						size={18}
					/>
				</Button>
			</Box>
		</Box>
	);
}

export default SelectionAudioBar;
