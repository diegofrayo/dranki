import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MainLayout } from "~/components/layout";
import { Box, Link, Text, Title } from "~/components/primitive";
import lessonsData from "~/data/lessons.json";

type Lesson = {
	id: string;
	title: string;
	emoji: string;
	description: string;
};

export default async function LessonsPage(): Promise<ReactTypes.JSXElement> {
	const lessons = lessonsData as Lesson[];

	return (
		<MainLayout>
			<Box className="mb-6">
				<Title
					as="h2"
					className="text-foreground mb-1 text-xl font-bold"
				>
					Lessons
				</Title>
				<Text className="text-muted-foreground text-sm">
					Browse all available lessons organized by grammar topic. Each lesson focuses on a specific
					concept to help you build a strong foundation in English, one rule at a time.
				</Text>
			</Box>
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{lessons.map((lesson) => (
					<Link
						key={lesson.id}
						href={`/lessons/${lesson.id}`}
						className="block rounded-2xl bg-blue-700 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
					>
						{lesson.emoji.length > 0 && <Text className="mb-1 text-3xl">{lesson.emoji}</Text>}
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{lesson.title}
						</Title>
						{lesson.description.length > 0 && (
							<Text className="mt-1 text-sm text-white/80 italic">{lesson.description}</Text>
						)}
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}
