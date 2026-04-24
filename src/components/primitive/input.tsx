import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

// --- PROPS & TYPES ---

type InputProps = ReactTypes.DOM.HTMLElementAttributes["input"];

// --- COMPONENT DEFINITION ---

function Input({ className = "", type = "text", ...rest }: InputProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		element: cn(
			"border-border bg-background text-foreground h-10 rounded-md border px-3 text-sm outline-none",
			"focus-visible:ring-ring/50 focus-visible:ring-[3px]",
			"disabled:cursor-not-allowed disabled:opacity-50",
			className,
		),
	};

	return (
		<input
			type={type}
			className={classes.element}
			{...rest}
		/>
	);
}

export default Input;
