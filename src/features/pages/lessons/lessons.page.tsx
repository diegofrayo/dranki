import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Lesson } from "~/api";
import { MainLayout } from "~/components/layout";
import { Box, Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type LessonsPageProps = {
	lessons: Lesson[];
};

async function LessonsPage({ lessons }: LessonsPageProps): Promise<ReactTypes.JSXElement> {
	return (
		<MainLayout>
			<Box className="mb-6">
				<Title
					as="h2"
					className="text-foreground mb-1 text-xl font-bold"
				>
					Lessons
				</Title>
				<Paragraph className="text-muted-foreground text-sm">
					Browse all available lessons organized by grammar topic. Each lesson focuses on a specific
					concept to help you build a strong foundation in English, one rule at a time.
				</Paragraph>
			</Box>
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						href={Routes.LESSON(lesson.id)}
						className="block rounded-2xl bg-emerald-600 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
					>
						<Paragraph className="mb-1 text-3xl">{lesson.emoji}</Paragraph>
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{lesson.title}
						</Title>
						<Paragraph className="mt-1 text-sm text-white/80 italic">
							{lesson.description}
						</Paragraph>
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}

export default LessonsPage;
