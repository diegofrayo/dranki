import { mergeProps } from "@base-ui/react";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";
import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

// --- PROPS & TYPES ---

const ButtonVariant = mirror(["DEFAULT", "DESTRUCTIVE", "OUTLINE", "SECONDARY", "GHOST", "LINK"]);
type ButtonVariant = keyof typeof ButtonVariant;
const ButtonSize = mirror(["DEFAULT", "SM", "LG", "ICON", "ICON_SM", "ICON_LG"]);
type ButtonSize = keyof typeof ButtonSize;
type ButtonProps = useRender.ComponentProps<"button"> & {
	size?: ButtonSize;
	type?: "submit" | "button" | "reset";
	variant?: ButtonVariant;
};

// --- COMPONENT DEFINITION ---

const Button = function Button({
	children,
	className = "",
	disabled = false,
	size = ButtonSize.DEFAULT,
	type = "button",
	variant = ButtonVariant.DEFAULT,
	render,
	onClick,
	...otherProps
}: ButtonProps): ReactTypes.JSXElement {
	const classes = {
		element: cn(
			`dr-button dr-button--${variant.toLowerCase()}`,
			styles({ variant, size }),
			className,
		),
	};

	const defaultProps: useRender.ElementProps<"button"> = {
		className: classes.element,
		children,
		disabled,
		type,
		onClick,
	};

	const element = useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(defaultProps, otherProps),
		render,
	});

	return element;
};

export default Button;

export { ButtonVariant, ButtonSize };

// --- STYLES ---

const styles = cva(
	"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				[ButtonVariant.DEFAULT]: "bg-primary text-primary-foreground hover:bg-primary/90",
				[ButtonVariant.DESTRUCTIVE]:
					"bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
				[ButtonVariant.OUTLINE]:
					"bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
				[ButtonVariant.SECONDARY]: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				[ButtonVariant.GHOST]:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				[ButtonVariant.LINK]: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				[ButtonSize.DEFAULT]: "h-9 px-4 py-2 has-[>svg]:px-3",
				[ButtonSize.SM]: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				[ButtonSize.LG]: "h-10 rounded-md px-6 has-[>svg]:px-4",
				[ButtonSize.ICON]: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: ButtonVariant.DEFAULT,
			size: ButtonSize.DEFAULT,
		},
	},
);
