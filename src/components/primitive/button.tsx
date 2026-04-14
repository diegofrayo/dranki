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
	"focus-visible:border-ring focus-visible:ring-ring/50 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				[ButtonVariant.DEFAULT]: "bg-primary text-primary-foreground hover:bg-primary/90",
				[ButtonVariant.DESTRUCTIVE]:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				[ButtonVariant.OUTLINE]:
					"border-border bg-background hover:bg-accent hover:text-accent-foreground border",
				[ButtonVariant.SECONDARY]: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				[ButtonVariant.GHOST]: "hover:bg-accent hover:text-accent-foreground",
				[ButtonVariant.LINK]: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				[ButtonSize.DEFAULT]: "h-9 px-4 py-2",
				[ButtonSize.SM]: "h-8 rounded-md px-3 text-xs",
				[ButtonSize.LG]: "h-11 rounded-md px-8",
				[ButtonSize.ICON]: "size-9",
				[ButtonSize.ICON_SM]: "size-8",
				[ButtonSize.ICON_LG]: "size-11",
			},
		},
		defaultVariants: {
			variant: ButtonVariant.DEFAULT,
			size: ButtonSize.DEFAULT,
		},
	},
);
