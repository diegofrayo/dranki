"use client";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Icon, IconCatalog, Link, Paragraph } from "~/components/primitive";

import Header from "./header";

type MainLayoutProps = {
	children: ReactTypes.Children;
};

function MainLayout({ children }: MainLayoutProps): ReactTypes.JSXElement {
	return (
		<Box
			as="main"
			className="flex min-h-screen flex-col"
		>
			<Header />

			<Box
				as="section"
				className="mx-auto min-h-0 w-full max-w-xl flex-1 px-4 py-6"
			>
				{children}
			</Box>

			<Box
				as="footer"
				className="border-border mt-8 shrink-0 border-t py-3"
			>
				<Paragraph className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-sm">
					<Icon
						name={IconCatalog.CODE_2}
						className="relative -top-px size-3.5"
					/>
					{"Coded by "}
					<Link
						href="https://diegofrayo.dev"
						className="text-foreground font-bold underline underline-offset-2"
						isExternalLink
					>
						Diego Rayo
					</Link>
				</Paragraph>
			</Box>
		</Box>
	);
}

export default MainLayout;
