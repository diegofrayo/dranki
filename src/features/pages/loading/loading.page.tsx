import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box } from "~/components/primitive";

export default function LoadingPage(): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		wrapper: "flex items-center justify-center gap-4 py-24 size-full min-h-full",
		spinner:
			"size-20 animate-spin rounded-full border-8 border-current border-t-transparent text-accent",
	};

	return (
		<Box
			as="section"
			className={classes.wrapper}
		>
			<Box
				as="span"
				className={classes.spinner}
				aria-label="Loading"
				role="status"
			/>
		</Box>
	);
}
