import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text } from "~/api";
import { Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type TextItemProps = {
	text: Text;
	showLesson?: boolean;
};

export default function TextItem({
	text,
	showLesson = true,
}: TextItemProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		link: "block rounded-2xl bg-violet-600 p-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
		emoji: "mb-1 text-3xl",
		title: "text-lg font-bold text-white",
		footer: "mt-1 text-right text-sm text-white/80 italic",
	};

	return (
		<Link
			href={Routes.TEXT(text.id)}
			className={classes.link}
		>
			<Paragraph className={classes.emoji}>{text.emoji}</Paragraph>
			<Title
				as="h3"
				className={classes.title}
			>
				{text.title}
			</Title>
			{showLesson && text.lesson && (
				<Paragraph className={classes.footer}>{text.lesson.title}</Paragraph>
			)}
		</Link>
	);
}
