import cn from "@diegofrayo-pkg/cn";
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
		link: cn(
			"relative flex items-center gap-2 rounded-2xl bg-violet-600 px-5 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
		),
		emoji: cn("text-3xl"),
		title: cn("my-6 text-lg leading-normal font-bold text-white"),
		footer: cn("absolute right-4 bottom-2 text-right text-xs text-white/80 italic"),
	};

	// --- RENDERS ---
	function renderFooter(): ReactTypes.JSXElement | null {
		if (showLesson) {
			if (text.lesson) {
				return <Paragraph className={classes.footer}>{text.lesson.title}</Paragraph>;
			}

			return null;
		}

		return <Paragraph className={classes.footer}>Text</Paragraph>;
	}

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
			{renderFooter()}
		</Link>
	);
}
