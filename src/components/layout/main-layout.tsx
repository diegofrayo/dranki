import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Text, Title } from "~/components/primitive";

import Breadcrumb from "./breadcrumb";

// --- PROPS & TYPES ---

type MainLayoutProps = {
	children: ReactTypes.Children;
};

// --- COMPONENT DEFINITION ---

function MainLayout({ children }: MainLayoutProps) {
	return (
		<Box
			as="main"
			className="min-h-screen pb-24"
		>
			<Box
				as="header"
				className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md"
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

			<Box className="mx-auto max-w-md px-4 py-6">{children}</Box>
		</Box>
	);
}

export default MainLayout;
