import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text as TextType } from "~/api";
import { MainLayout } from "~/components/layout";
import { Box, Link, Text, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type TextsPageProps = {
	texts: TextType[];
};

export default async function TextsPage({ texts }: TextsPageProps): Promise<ReactTypes.JSXElement> {
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
				{texts.map((text) => (
					<Link
						key={text.title}
						href={Routes.TEXT(text.id)}
						className={`block rounded-2xl bg-violet-600 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80`}
					>
						<Text className="mb-1 text-3xl">{text.lesson.emoji}</Text>
						<Title
							as="h2"
							className="text-lg font-bold text-white"
						>
							{text.title}
						</Title>
						<Text className="mt-1 text-right text-sm text-white/80 italic">
							{text.lesson.title}
						</Text>
					</Link>
				))}
			</Box>
		</MainLayout>
	);
}
