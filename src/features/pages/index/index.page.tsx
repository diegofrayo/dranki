import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MainLayout } from "~/components/layout";
import { Box, Link, Paragraph, Title } from "~/components/primitive";
import { Emojis, Routes } from "~/constants";

export default function HomePage(): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		link: (bgColor: string): string =>
			cn(
				"block rounded-2xl p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
				bgColor,
			),
	};

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
						className={classes.link(feature.bgColor)}
					>
						<Paragraph className="mb-1 text-3xl">{feature.emoji}</Paragraph>
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{feature.title}
						</Title>
						<Paragraph className="mt-1 text-sm text-white/80">{feature.description}</Paragraph>
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}

// --- CONSTANTS ---

const FEATURES = [
	{
		emoji: Emojis.LESSONS,
		title: "Lessons",
		description: "Clear explanations about grammar topics like simple present, future, and more.",
		href: Routes.LESSONS,
		bgColor: "bg-emerald-500",
	},
	{
		emoji: Emojis.DECKS,
		title: "Decks",
		description: "Bunches of phrases grouped by topic — phrasal verbs, simple past, and more.",
		href: Routes.DECKS,
		bgColor: "bg-blue-500",
	},
	{
		emoji: Emojis.TEXTS,
		title: "Texts",
		description:
			"Short texts that put vocabulary and phrases in context — read and learn naturally.",
		href: Routes.TEXTS,
		bgColor: "bg-violet-500",
	},
];
