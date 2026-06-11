import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text } from "~/api/types";
import { InlineText, Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

type TextItemProps = {
	text: Text;
	variant?: "DEFAULT" | "FROM_LESSON";
};

export default function TextItem({
	text,
	variant = "DEFAULT",
}: TextItemProps): ReactTypes.JSXElement {
	// --- COMPUTED STATES ---
	const isFromLessonVariant = variant === "FROM_LESSON";
	const isDefaultVariant = variant === "DEFAULT";
	const hasLesson = !!text.lesson;
	const isPublic = text.public;

	// --- STYLES ---
	const classes = {
		link: cn(
			"relative flex h-30 flex-col items-start justify-start gap-1 rounded-2xl bg-violet-600 px-3 py-3 text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80",
			{ "bg-violet-800": !isPublic },
			{ "justify-center": !hasLesson },
		),
		emoji: cn("text-base", { "text-2xl": isFromLessonVariant }),
		title: cn("text-base font-bold break-normal text-white"),
		footer: cn("mt-auto w-full text-right text-xs text-white/80 italic"),
	};

	// --- RENDERS ---
	function renderFooter(): ReactTypes.JSXElement | null {
		if (isDefaultVariant && text.lesson) {
			return <Paragraph className={classes.footer}>{text.lesson.title}</Paragraph>;
		}

		return null;
	}

	return (
		<Link
			href={Routes.TEXT(text.id)}
			className={classes.link}
		>
			{isFromLessonVariant && (
				<InlineText className="absolute top-2 right-2 rounded-md bg-white/20 px-2 py-1 text-xs font-bold">
					Text
				</InlineText>
			)}
			<InlineText className={classes.emoji}>{text.emoji}</InlineText>
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
