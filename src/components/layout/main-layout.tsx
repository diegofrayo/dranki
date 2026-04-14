import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Text, Title } from "~/components/primitive";

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
				<Box className="mx-auto max-w-md px-4 py-4">
					<Title
						as="h1"
						className="text-foreground text-2xl font-extrabold"
					>
						dranki
					</Title>
					<Text className="text-muted-foreground text-sm">Practice English phrases</Text>
					<Breadcrumb />
				</Box>
			</Box>

			<Box className="mx-auto min-h-0 w-full max-w-md flex-1 px-4 py-6">{children}</Box>
		</Box>
	);
}

export default MainLayout;
