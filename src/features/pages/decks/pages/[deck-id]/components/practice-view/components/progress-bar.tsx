import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, InlineText } from "~/components/primitive";

// --- TYPES ---

type ProgressBarProps = {
	current: number;
	total: number;
};

// --- COMPONENT DEFINITION ---

function ProgressBar({ current, total }: ProgressBarProps): ReactTypes.JSXElement {
	// --- COMPUTED STATES ---
	const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

	// --- STYLES ---
	const classes = {
		wrapper: "flex items-center gap-3",
		barContainer: "relative h-5 flex-1 overflow-hidden rounded-full bg-secondary",
		barFill: "absolute inset-0 h-full rounded-full bg-primary transition-all duration-500 ease-out",
		barLabel: "absolute inset-0 flex items-center justify-center text-xs font-bold  text-black",
		count: "text-muted-foreground shrink-0 text-sm font-semibold tabular-nums",
	};

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.barContainer}>
				<Box
					className={classes.barFill}
					style={{ width: `${percentage}%` }}
				/>
				{percentage > 0 && <InlineText className={classes.barLabel}>{percentage}%</InlineText>}
			</Box>
			<InlineText className={classes.count}>
				{current}/{total}
			</InlineText>
		</Box>
	);
}

export default ProgressBar;
