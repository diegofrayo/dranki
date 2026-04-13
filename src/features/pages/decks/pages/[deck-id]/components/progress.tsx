"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { cn } from "~/legacy/lib/utils";

type ProgressProps = {
	className?: string;
	value: number | null;
};

function Progress({ className, value }: ProgressProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		track: cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className),
		indicator: cn("bg-primary h-full w-full flex-1 transition-all"),
	};

	return (
		<ProgressPrimitive.Root value={value}>
			<ProgressPrimitive.Track className={classes.track}>
				<ProgressPrimitive.Indicator
					className={classes.indicator}
					style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
				/>
			</ProgressPrimitive.Track>
		</ProgressPrimitive.Root>
	);
}

export default Progress;
