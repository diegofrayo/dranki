"use client";

import { useRef } from "react";

import cn from "@diegofrayo-pkg/cn";
import { withRenderInBrowser } from "@diegofrayo-pkg/hocs";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Deck, Lesson, Text } from "~/api";
import {
	ContentActions,
	DeckItem,
	MarkdownRenderer,
	SelectionAudioBar,
	TextItem,
} from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Separator, Title } from "~/components/primitive";
import { useFontSize } from "~/hooks";

type LessonPageProps = {
	content: string;
	lesson: Lesson;
	practiceDecks: Deck[];
	practiceTexts: Text[];
};

function LessonPage({
	content,
	lesson,
	practiceDecks,
	practiceTexts,
}: LessonPageProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const fontSizeConfig = useFontSize({ storageKey: "DR_LESSON_FONT_SIZE" });

	// --- STATES & REFS ---
	const contentRef = useRef<HTMLDivElement>(null);

	// --- STYLES ---
	const classes = {
		article: cn("transition-[font-size]", fontSizeConfig.fontSize),
	};

	return (
		<MainLayout>
			<Box className="mb-6">
				<Box className="mb-1 text-4xl">{lesson.emoji}</Box>
				<Title
					as="h1"
					className="text-foreground text-2xl font-bold"
				>
					{lesson.title}
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
			<PracticeSection
				decks={practiceDecks}
				texts={practiceTexts}
			/>
			<SelectionAudioBar containerRef={contentRef} />
		</MainLayout>
	);
}

export default withRenderInBrowser(LessonPage);

// --- COMPONENTS ---

type PracticeSectionProps = {
	decks: Deck[];
	texts: Text[];
};

function PracticeSection({ decks, texts }: PracticeSectionProps): ReactTypes.JSXElement | null {
	// --- COMPUTED STATES ---
	const hasPracticeContent = texts.length > 0 || decks.length > 0;

	// --- STYLES ---
	const classes = {
		section: "bg-muted/40 border-border rounded-2xl border p-5 shadow-sm",
		title: "text-foreground mb-4 text-center text-2xl font-bold",
		groupTitle: "text-foreground mb-2 text-base font-semibold",
		group: "mb-6 last:mb-0",
		list: "flex flex-col gap-3",
	};

	if (!hasPracticeContent) {
		return null;
	}

	return (
		<>
			<Separator className="bg-border my-16" />
			<Box
				as="section"
				className={classes.section}
			>
				<Title
					as="h2"
					className={classes.title}
				>
					Practice
				</Title>
				{decks.length > 0 && (
					<Box className={classes.group}>
						<Title
							as="h3"
							className={classes.groupTitle}
						>
							Decks
						</Title>
						<Box className={classes.list}>
							{decks.map((deck) => (
								<DeckItem
									key={deck.id}
									deck={deck}
								/>
							))}
						</Box>
					</Box>
				)}
				{texts.length > 0 && (
					<Box className={classes.group}>
						<Title
							as="h3"
							className={classes.groupTitle}
						>
							Texts
						</Title>
						<Box className={classes.list}>
							{texts.map((text) => (
								<TextItem
									key={text.id}
									text={text}
									showLesson={false}
								/>
							))}
						</Box>
					</Box>
				)}
			</Box>
		</>
	);
}
