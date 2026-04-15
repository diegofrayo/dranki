import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Image, Paragraph, Title } from "~/components/primitive";
import { PROJECT_METADATA } from "~/constants";

import Breadcrumb from "./breadcrumb";

// --- PROPS & TYPES ---

type MainLayoutProps = {
	children: ReactTypes.Children;
};

// --- COMPONENT DEFINITION ---

function MainLayout({ children }: MainLayoutProps): ReactTypes.JSXElement {
	return (
		<Box
			as="main"
			className="flex min-h-screen flex-col"
		>
			<Box
				as="header"
				className="border-border bg-background/80 sticky top-0 z-40 w-full shrink-0 border-b backdrop-blur-md"
			>
				<Box className="mx-auto flex max-w-md gap-3 px-4 py-4">
					<Image
						src="/logo/logo.png"
						alt="dranki logo"
						className="size-12"
						width={32}
						height={32}
					/>
					<Box>
						<Title
							as="h1"
							className="text-foreground text-2xl font-extrabold"
						>
							{PROJECT_METADATA.appName}
						</Title>
						<Paragraph className="text-muted-foreground text-sm">
							{PROJECT_METADATA.slogan}
						</Paragraph>
					</Box>
				</Box>
			</Box>
			<Box className="mx-auto w-full max-w-md px-4 py-2">
				<Breadcrumb />
			</Box>
			<Box className="mx-auto min-h-0 w-full max-w-md flex-1 px-4 py-6">{children}</Box>
		</Box>
	);
}

export default MainLayout;
