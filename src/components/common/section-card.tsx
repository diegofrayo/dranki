import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Title } from "~/components/primitive";

type SectionCardProps = {
	children: ReactTypes.Children;
	title: string;
};

export default function SectionCard({ children, title }: SectionCardProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		section: "bg-muted border-border rounded-lg border p-4",
		title: "text-foreground mb-8 text-center text-3xl font-bold uppercase font-serif",
	};

	return (
		<Box
			as="section"
			className={classes.section}
		>
			<Title
				as="h2"
				className={classes.title}
			>
				{title}
			</Title>
			{children}
		</Box>
	);
}
