import { Switch as BaseSwitch } from "@base-ui/react/switch";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

// --- PROPS & TYPES ---

type SwitchProps = {
	checked: boolean;
	className?: string;
	disabled?: boolean;
	onCheckedChange: (checked: boolean) => void;
};

// --- COMPONENT DEFINITION ---

function Switch({
	checked,
	disabled = false,
	className = "",
	onCheckedChange,
}: SwitchProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: cn(
			"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200",
			"focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
			"data-checked:bg-primary data-unchecked:bg-muted",
			"disabled:cursor-not-allowed disabled:opacity-50",
			className,
		),
		thumb: cn(
			"block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
			"data-checked:translate-x-6 data-unchecked:translate-x-1",
		),
	};

	return (
		<BaseSwitch.Root
			checked={checked}
			disabled={disabled}
			className={classes.root}
			onCheckedChange={onCheckedChange}
		>
			<BaseSwitch.Thumb className={classes.thumb} />
		</BaseSwitch.Root>
	);
}

export default Switch;
