"use client";

import { useRef } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text } from "~/api";
import { ContentActions, MarkdownRenderer, SelectionAudioBar } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Title } from "~/components/primitive";
import { useFontSize } from "~/hooks";

import PracticeWordsTable from "./components/practice-words-table";

type TextLessonPageProps = {
	textDetails: Text;
	content: string;
};

export default function TextLessonPage({
	textDetails,
	content,
}: TextLessonPageProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const fontSizeConfig = useFontSize({ storageKey: "DR_TEXT_FONT_SIZE" });

	// --- STATES & REFS ---
	const contentRef = useRef<HTMLDivElement>(null);

	// --- STYLES ---
	const classes = {
		article: cn("transition-[font-size]", fontSizeConfig.fontSize),
	};

	return (
		<MainLayout>
			<Box className="mb-6">
				<Box className="mb-1 text-4xl">{textDetails.emoji}</Box>
				<Title
					as="h1"
					className="text-foreground text-2xl font-bold"
				>
					{textDetails.title}
				</Title>
			</Box>
			<ContentActions
				fontSizeConfig={fontSizeConfig}
				className="mb-4"
			/>
			<Box
				as="article"
				ref={contentRef}
				className={classes.article}
			>
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</Box>

			<PracticeWordsTable practiceWords={textDetails.practiceWords} />

			<SelectionAudioBar containerRef={contentRef} />
		</MainLayout>
	);
}
