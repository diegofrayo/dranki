"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import type { Text } from "~/api/types";
import { TextItem } from "~/components/common";
import { Box, Paragraph, Title } from "~/components/primitive";
import { useAuth } from "~/features/auth";

type TextsPageProps = {
	texts: Text[];
};

export default function TextsPage({ texts }: TextsPageProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const auth = useAuth();

	return (
		<Box>
			<Box className="mb-6">
				<Title
					as="h2"
					className="text-foreground mb-1 text-xl font-bold"
				>
					Texts
				</Title>
				<Paragraph className="text-muted-foreground text-sm">
					Short texts that put vocabulary and grammar in context. Read each one to reinforce what
					you&apos;ve learned and practice understanding English naturally.
				</Paragraph>
			</Box>
			<Box
				as="section"
				className="flex flex-col gap-4"
			>
				{texts.map((text) => {
					const isTextPublic = text.public === true;

					if (isTextPublic || auth.status === "AUTHENTICATED") {
						return (
							<TextItem
								key={text.id}
								text={text}
							/>
						);
					}

					return null;
				})}
			</Box>
		</Box>
	);
}
