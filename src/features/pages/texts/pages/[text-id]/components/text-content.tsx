"use client";

import { useBrowserStorage } from "@diegofrayo-pkg/browser-storage";
import cn from "@diegofrayo-pkg/cn";
import { withRenderInBrowser } from "@diegofrayo-pkg/hocs";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MarkdownRenderer } from "~/components/common";
import { Box, Button, Icon } from "~/components/primitive";
import { IconCatalog } from "~/components/primitive/icon/icons";

type TextContentProps = {
	content: string;
};

function TextContent({ content }: TextContentProps): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [fontSizeIndex, setFontSizeIndex] = useBrowserStorage<number>({
		key: "DR_TEXT_FONT_SIZE",
		value: DEFAULT_FONT_SIZE_INDEX,
		readInitialValueFromStorage: true,
		saveDuringCreation: true,
	});

	// --- COMPUTED STATES ---
	const isMinSize = fontSizeIndex === 0;
	const isMaxSize = fontSizeIndex === FONT_SIZES.length - 1;
	const currentFontSize: FontSize = FONT_SIZES[fontSizeIndex]!;

	// --- STYLES ---
	const classes = {
		controls: "mb-4 flex items-center justify-end gap-2",
		article: cn("transition-[font-size]", currentFontSize),
	};

	// --- HANDLERS ---
	function handleDecreaseFontSizeClick(): void {
		setFontSizeIndex((prev: number) => Math.max(0, prev - 1));
	}

	function handleIncreaseFontSizeClick(): void {
		setFontSizeIndex((prev: number) => Math.min(FONT_SIZES.length - 1, prev + 1));
	}

	return (
		<>
			<Box className={classes.controls}>
				<Button
					variant="GHOST"
					size="ICON_SM"
					disabled={isMinSize}
					onClick={handleDecreaseFontSizeClick}
				>
					<Icon
						name={IconCatalog.A_ARROW_DOWN}
						size={18}
					/>
				</Button>
				<Button
					variant="GHOST"
					size="ICON_SM"
					disabled={isMaxSize}
					onClick={handleIncreaseFontSizeClick}
				>
					<Icon
						name={IconCatalog.A_ARROW_UP}
						size={18}
					/>
				</Button>
			</Box>
			<Box
				as="article"
				className={classes.article}
			>
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</Box>
		</>
	);
}

export default withRenderInBrowser(TextContent);

// --- CONSTANTS ---

const DEFAULT_FONT_SIZE_INDEX = 1;
const FONT_SIZES = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"] as const;

// --- TYPES ---

type FontSize = (typeof FONT_SIZES)[number];
