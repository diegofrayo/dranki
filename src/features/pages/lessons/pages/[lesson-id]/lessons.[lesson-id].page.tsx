import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MarkdownRenderer } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box } from "~/components/primitive";
import lessonsData from "~/data/lessons.json";

import type { LessonPageProps } from "./lessons.[lesson-id].types";

// --- TYPES ---

type Lesson = {
	id: string;
	title: string;
	emoji: string;
	description: string;
};

// --- UTILS ---

function getLessonDetails(lessonId: string): Lesson | undefined {
	return (lessonsData as Lesson[]).find((lesson) => lesson.id === lessonId);
}

async function readMarkdownFile(lessonId: string): Promise<string> {
	const filePath = path.join(process.cwd(), "src", "data", "lessons", `${lessonId}.md`);
	return readFile(filePath, "utf-8");
}

// --- PAGE COMPONENT ---

export default async function LessonPage({
	params,
}: LessonPageProps): Promise<ReactTypes.JSXElement> {
	const { "lesson-id": lessonId } = await params;

	const lesson = getLessonDetails(lessonId);
	if (lesson === undefined) {
		return notFound();
	}

	const content = await readMarkdownFile(lessonId);

	return (
		<MainLayout>
			<Box className="mb-6">
				{lesson.emoji.length > 0 && <Box className="mb-1 text-4xl">{lesson.emoji}</Box>}
			</Box>
			<Box as="article">
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</Box>
		</MainLayout>
	);
}
