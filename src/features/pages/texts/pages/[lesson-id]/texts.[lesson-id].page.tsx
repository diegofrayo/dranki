import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

import { MarkdownRenderer } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Title } from "~/components/primitive";
import lessonsData from "~/data/lessons.json";
import textsData from "~/data/texts.json";

import type { TextLessonPageProps } from "./texts.[lesson-id].types";

// --- TYPES ---

type Lesson = {
	id: string;
	title: string;
	emoji: string;
	description: string;
};

type TextItem = {
	lesson: string;
};

// --- UTILS ---

function getLessonDetails(lessonId: string): Lesson | undefined {
	return (lessonsData as Lesson[]).find((lesson) => lesson.id === lessonId);
}

function isValidTextLesson(lessonId: string): boolean {
	return (textsData as TextItem[]).some((item) => item.lesson === lessonId);
}

async function readMarkdownFile(lessonId: string): Promise<string> {
	const filePath = path.join(process.cwd(), "src", "data", "texts", `${lessonId}.md`);
	return readFile(filePath, "utf-8");
}

// --- PAGE COMPONENT ---

export default async function TextLessonPage({ params }: TextLessonPageProps) {
	const { "lesson-id": lessonId } = await params;

	if (!isValidTextLesson(lessonId)) {
		return notFound();
	}

	const lesson = getLessonDetails(lessonId);
	const content = await readMarkdownFile(lessonId);

	return (
		<MainLayout>
			{lesson !== undefined && (
				<Box className="mb-6">
					{lesson.emoji.length > 0 && <Box className="mb-1 text-4xl">{lesson.emoji}</Box>}
					<Title
						as="h1"
						className="text-foreground text-2xl font-bold"
					>
						{lesson.title}
					</Title>
					{lesson.description.length > 0 && (
						<Box className="text-muted-foreground mt-1 text-sm">{lesson.description}</Box>
					)}
				</Box>
			)}
			<Box as="article">
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</Box>
		</MainLayout>
	);
}
