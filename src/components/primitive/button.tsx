import { mergeProps } from "@base-ui/react";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";
import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

// --- PROPS & TYPES ---

const ButtonVariant = mirror(["DEFAULT"]);
type ButtonVariant = keyof typeof ButtonVariant;
const ButtonSize = mirror(["DEFAULT"]);
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

const styles = cva("", {
	variants: {
		variant: {
			DEFAULT: "",
		},
		size: {
			DEFAULT: "",
		},
	},
	defaultVariants: {},
});
