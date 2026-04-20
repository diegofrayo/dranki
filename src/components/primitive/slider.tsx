import { Slider as BaseSlider } from "@base-ui/react/slider";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

// --- PROPS & TYPES ---

type SliderProps = {
	value: number;
	className?: string;
	disabled?: boolean;
	max?: number;
	min?: number;
	step?: number;
	onValueChange: (value: number) => void;
};

// --- COMPONENT DEFINITION ---

function Slider({
	value,
	className,
	disabled = false,
	max = 100,
	min = 0,
	step = 1,
	onValueChange,
}: SliderProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: cn("relative flex w-full touch-none items-center select-none", className),
		control: "relative flex h-5 w-full items-center",
		track: "bg-muted relative h-1.5 w-full grow rounded-full",
		indicator: "bg-primary absolute h-full rounded-full",
		thumb: cn(
			"border-primary bg-background block size-4 rounded-full border-2 shadow-sm transition-colors",
			"focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
			"disabled:pointer-events-none disabled:opacity-50",
		),
	};

	// --- HANDLERS ---
	function handleValueChange(newValue: number | readonly number[]): void {
		onValueChange(typeof newValue === "number" ? newValue : (newValue[0] ?? 0));
	}

	return (
		<BaseSlider.Root
			value={value}
			disabled={disabled}
			max={max}
			min={min}
			step={step}
			className={classes.root}
			onValueChange={handleValueChange}
		>
			<BaseSlider.Control className={classes.control}>
				<BaseSlider.Track className={classes.track}>
					<BaseSlider.Indicator className={classes.indicator} />
					<BaseSlider.Thumb className={classes.thumb} />
				</BaseSlider.Track>
			</BaseSlider.Control>
		</BaseSlider.Root>
	);
}

export default Slider;
