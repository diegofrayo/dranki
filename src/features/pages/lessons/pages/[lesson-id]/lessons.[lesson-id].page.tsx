import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MarkdownRenderer } from "~/components/common";
import { MainLayout } from "~/components/layout";
import { Box } from "~/components/primitive";

import type { LessonPageProps } from "./lessons.[lesson-id].types";

export default async function LessonPage({
	lesson,
	content,
}: LessonPageProps): Promise<ReactTypes.JSXElement> {
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
