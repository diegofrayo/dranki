"use client";

import { useRef } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Lesson } from "~/api";
import { MarkdownRenderer, SelectionAudioBar } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box } from "~/components/primitive";

type LessonPageProps = {
	lesson: Lesson;
	content: string;
};

export default function LessonPage({ lesson, content }: LessonPageProps): ReactTypes.JSXElement {
	const articleRef = useRef<HTMLDivElement>(null);

	return (
		<MainLayout>
			<Box className="mb-6">
				{lesson.emoji.length > 0 && <Box className="mb-1 text-4xl">{lesson.emoji}</Box>}
			</Box>
			<Box
				as="article"
				ref={articleRef}
			>
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</Box>
			<SelectionAudioBar containerRef={articleRef} />
		</MainLayout>
	);
}
