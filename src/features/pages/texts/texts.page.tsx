import { MainLayout } from "~/components/layout";
import { Box, Link, Text, Title } from "~/components/primitive";
import lessonsData from "~/data/lessons.json";
import textsData from "~/data/texts.json";

type TextItem = {
	lesson_id: string;
	title: string;
};

type Lesson = {
	id: string;
	title: string;
	emoji: string;
	description: string;
};

function getLessonDetails(lessonId: string): Lesson | undefined {
	return (lessonsData as Lesson[]).find((lesson) => lesson.id === lessonId);
}

export default async function TextsPage() {
	const texts = textsData as TextItem[];

	const items = texts
		.map((text) => ({
			title: text.title,
			lesson: getLessonDetails(text.lesson_id),
		}))
		.filter((item): item is { title: string; lesson: Lesson } => item.lesson !== undefined);

	return (
		<MainLayout>
			<Box className="mb-6">
				<Title
					as="h2"
					className="text-foreground mb-1 text-xl font-bold"
				>
					Texts
				</Title>
				<Text className="text-muted-foreground text-sm">
					Short texts that put vocabulary and grammar in context. Read each one to reinforce what
					you&apos;ve learned and practice understanding English naturally.
				</Text>
			</Box>
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{items.map((item) => (
					<Link
						key={item.title}
						href={`/texts/${item.lesson.id}`}
						className={`block rounded-2xl bg-purple-700 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80`}
					>
						{item.lesson.emoji.length > 0 && (
							<Text className="mb-1 text-3xl">{item.lesson.emoji}</Text>
						)}
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{item.title}
						</Title>
						{item.lesson.description.length > 0 && (
							<Text className="mt-1 text-right text-sm text-white/80 italic">
								{item.lesson.title}
							</Text>
						)}
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}
