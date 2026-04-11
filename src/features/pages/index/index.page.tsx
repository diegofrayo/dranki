import { MainLayout } from "~/components/layout";
import { Box, Link, Text, Title } from "~/components/primitive";

const FEATURES = [
	{
		emoji: "📚",
		title: "Decks",
		description: "Bunches of phrases grouped by topic — phrasal verbs, simple past, and more.",
		href: "/decks",
		bgColor: "bg-blue-500",
	},
	{
		emoji: "📖",
		title: "Lessons",
		description: "Clear explanations about grammar topics like simple present, future, and more.",
		href: "/lessons",
		bgColor: "bg-emerald-500",
	},
	{
		emoji: "📝",
		title: "Texts",
		description:
			"Short texts that put vocabulary and phrases in context — read and learn naturally.",
		href: "/texts",
		bgColor: "bg-violet-500",
	},
];

export default async function HomePage() {
	return (
		<MainLayout>
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{FEATURES.map((feature) => (
					<Link
						key={feature.href}
						href={feature.href}
						className={`${feature.bgColor} block rounded-2xl p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80`}
					>
						<Text className="mb-1 text-3xl">{feature.emoji}</Text>
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{feature.title}
						</Title>
						<Text className="mt-1 text-sm text-white/80">{feature.description}</Text>
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}
