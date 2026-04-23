"use client";

import { useRef, useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { ContentActions, MarkdownRenderer, SelectionAudioBar } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Button, Icon, IconCatalog, Title } from "~/components/primitive";
import { useFontSize } from "~/hooks";

import type { TextPageProps } from "./[text-id].types";
import PracticeWordsTable from "./components/practice-words-table";

export default function TextPage({ details, content }: TextPageProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const fontSizeConfig = useFontSize({ storageKey: "DR_TEXT_FONT_SIZE" });

	// --- STATES & REFS ---
	const contentRef = useRef<HTMLDivElement>(null);
	const [showTranslation, setShowTranslation] = useState(false);

	// --- COMPUTED STATES ---
	const hasTranslation = content.translation.trim().length > 0;
	const displayedContent = showTranslation ? content.translation : content.originalText;

	// --- STYLES ---
	const classes = {
		article: cn("transition-[font-size]", fontSizeConfig.fontSize),
	};

	// --- HANDLERS ---
	function handleToggleTranslationClick(): void {
		setShowTranslation((current) => !current);
	}

	return (
		<MainLayout>
			<Box className="mb-6">
				<Box className="mb-1 text-4xl">{details.emoji}</Box>
				<Title
					as="h1"
					className="text-foreground text-2xl font-bold"
				>
					{details.title}
				</Title>
			</Box>
			<Box
				as="article"
				ref={contentRef}
				className={classes.article}
			>
				<MarkdownRenderer>{displayedContent}</MarkdownRenderer>
			</Box>

			<PracticeWordsTable practiceWords={details.practiceWords} />

			<Box
				className="fixed inset-x-0 bottom-4 z-30 flex w-full justify-center px-4"
				role="toolbar"
				aria-label="Text content actions"
			>
				<Box className="border-border bg-background flex items-center justify-center gap-2 rounded-full border px-2 py-1 shadow-lg">
					{hasTranslation && (
						<Button
							variant="GHOST"
							size="ICON_SM"
							aria-pressed={showTranslation}
							aria-label={showTranslation ? "Show original text" : "Show translation"}
							onClick={handleToggleTranslationClick}
						>
							<Icon
								name={IconCatalog.LANGUAGES}
								size={18}
							/>
						</Button>
					)}
					<ContentActions fontSizeConfig={fontSizeConfig} />
				</Box>
			</Box>

			<SelectionAudioBar containerRef={contentRef} />
		</MainLayout>
	);
}
