import type ReactTypes from "@diegofrayo-pkg/types/react";

import { MainLayout } from "~/components/layout";
import { Box, Link, Paragraph, Title } from "~/components/primitive";
import { Routes } from "~/constants";

export default function ErrorPage(): ReactTypes.JSXElement {
	return (
		<MainLayout>
			<Box
				as="section"
				className="flex flex-col items-center gap-4 py-16 text-center"
			>
				<Title
					as="h2"
					className="text-foreground text-6xl font-extrabold"
				>
					500
				</Title>
				<Title
					as="h3"
					className="text-foreground text-xl font-bold"
				>
					Something went wrong
				</Title>
				<Paragraph className="text-muted-foreground text-sm">
					Please try again later. If the problem persists, contact support.
				</Paragraph>
				<Link
					href={Routes.INDEX}
					className="bg-foreground text-background mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
				>
					Go home
				</Link>
			</Box>
		</MainLayout>
	);
}
