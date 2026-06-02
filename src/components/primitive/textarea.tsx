import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

// --- PROPS & TYPES ---

type TextareaProps = ReactTypes.DOM.HTMLElementAttributes["textarea"];

// --- COMPONENT DEFINITION ---

function Textarea({ className = "", ...rest }: TextareaProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		element: cn(
			"border-border bg-background text-foreground h-10 rounded-md border p-2 text-sm outline-none",
			"focus-visible:ring-ring/50 focus-visible:ring-[3px]",
			"disabled:cursor-not-allowed disabled:opacity-50",
			className,
		),
	};

	return (
		<textarea
			className={classes.element}
			{...rest}
		/>
	);
}

export default Textarea;
