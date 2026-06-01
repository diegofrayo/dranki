import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonVariant,
	Icon,
	IconCatalog,
	Paragraph,
	type IconName,
} from "~/components/primitive";

import type { PracticeMode } from "../../../context/deck-session-context";

type PracticeModeButtonProps = {
	description: string;
	icon: IconName;
	id: PracticeMode;
	isSelected: boolean;
	label: string;
	onClick: (mode: PracticeMode) => void;
};

function PracticeModeButton({
	description,
	icon,
	id,
	isSelected,
	label,
	onClick,
}: PracticeModeButtonProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		button: cn(
			"h-auto w-full flex-col items-start justify-start gap-1 rounded-xl p-3 text-left whitespace-normal",
			isSelected && "ring-primary ring-2 ring-offset-1",
		),
		label: "text-sm font-semibold leading-tight",
		description: cn(
			"text-xs leading-tight",
			isSelected ? "text-primary-foreground/80" : "text-muted-foreground",
		),
	};

	// --- HANDLERS ---
	function handleButtonClick(): void {
		onClick(id);
	}

	return (
		<Button
			variant={isSelected ? ButtonVariant.DEFAULT : ButtonVariant.SECONDARY}
			className={classes.button}
			onClick={handleButtonClick}
		>
			<Box className="flex items-center justify-start gap-1">
				<Icon
					name={icon}
					size={14}
				/>
				<Paragraph className={classes.label}>{label}</Paragraph>
			</Box>
			<Paragraph className={classes.description}>{description}</Paragraph>
		</Button>
	);
}

export default PracticeModeButton;

// --- TYPES ---

export type PracticeModeConfig = {
	id: PracticeMode;
	description: string;
	icon: IconName;
	label: string;
};

// --- CONSTANTS ---

export const PRACTICE_MODES: PracticeModeConfig[] = [
	{
		id: "LISTENING",
		label: "Listening",
		description: "Hear & type",
		icon: IconCatalog.VOLUME,
	},
	{
		id: "VOCABULARY",
		label: "Vocabulary",
		description: "Type from translation",
		icon: IconCatalog.BOOK_OPEN,
	},
	{
		id: "REGULAR",
		label: "Regular",
		description: "Swipe to progress",
		icon: IconCatalog.ROTATE_CCW,
	},
	{
		id: "CUSTOM",
		label: "Custom",
		description: "Your settings",
		icon: IconCatalog.SETTINGS,
	},
];
