import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MarkdownRenderer } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box, Title } from "~/components/primitive";

import type { TextLessonPageProps } from "./texts.[text-id].types";

export default async function TextLessonPage({
	textDetails,
	content,
}: TextLessonPageProps): Promise<ReactTypes.JSXElement> {
	return (
		<MainLayout>
			<Box className="mb-6">
				<Box className="mb-1 text-4xl">{textDetails.lesson.emoji}</Box>
				<Title
					as="h1"
					className="text-foreground text-2xl font-bold"
				>
					{textDetails.title}
				</Title>
			</Box>
			<Box as="article">
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</Box>
		</MainLayout>
	);
}
