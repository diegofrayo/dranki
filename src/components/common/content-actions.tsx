"use client";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, Icon, IconCatalog } from "~/components/primitive";
import type { FontSizeConfig } from "~/hooks";

type ContentActionsProps = {
	fontSizeConfig: FontSizeConfig;
	className?: string;
};

export default function ContentActions({
	fontSizeConfig,
	className,
}: ContentActionsProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		container: cn("flex items-center justify-end gap-2", className),
	};

	// --- HANDLERS ---
	function handleDecreaseClick(): void {
		fontSizeConfig.decreaseFontSize();
	}

	function handleIncreaseClick(): void {
		fontSizeConfig.increaseFontSize();
	}

	return (
		<Box className={classes.container}>
			<Button
				variant="GHOST"
				size="ICON_SM"
				disabled={!fontSizeConfig.canDecreaseFontSize}
				onClick={handleDecreaseClick}
			>
				<Icon
					name={IconCatalog.A_ARROW_DOWN}
					size={18}
				/>
			</Button>
			<Button
				variant="GHOST"
				size="ICON_SM"
				disabled={!fontSizeConfig.canIncreaseFontSize}
				onClick={handleIncreaseClick}
			>
				<Icon
					name={IconCatalog.A_ARROW_UP}
					size={18}
				/>
			</Button>
		</Box>
	);
}
