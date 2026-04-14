import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text } from "~/api";
import { MainLayout } from "~/components/layout";
import { Box, Title } from "~/components/primitive";

import TextContent from "./components/text-content";

export type TextLessonPageProps = {
	textDetails: Text;
	content: string;
};

export default function TextLessonPage({
	textDetails,
	content,
}: TextLessonPageProps): ReactTypes.JSXElement {
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
			<TextContent content={content} />
		</MainLayout>
	);
}
