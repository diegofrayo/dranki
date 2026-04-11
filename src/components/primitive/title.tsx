import { cva } from "class-variance-authority";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";
import { mirror } from "@diegofrayo-pkg/utilities/arrays-and-objects";

// --- PROPS & TYPES ---

const TitleVariant = mirror(["UNSTYLED", "SIMPLE", "STYLED"]);
type TitleVariant = keyof typeof TitleVariant;

const TitleSize = mirror(["SM", "MD", "LG", "XL"]);
type TitleSize = keyof typeof TitleSize;

const As = mirror(["h1", "h2", "h3", "h4", "h5", "h6"]);
type As = keyof typeof As;

export type TitleProps = ReactTypes.DOM.HTMLElementAttributes["h1"] & {
	as: As;
	size?: TitleSize;
	variant?: TitleVariant;
};

// --- COMPONENT DEFINITION ---

function Title({
	children,
	className = "",
	as: Tag,
	size,
	variant = TitleVariant.UNSTYLED,
	...rest
}: TitleProps) {
	// --- STYLES ---
	const classes = {
		element: cn(
			`dr-title dr-title--${variant.toLowerCase()}`,
			styles({ as: Tag, size, variant }),
			className,
		),
	};

	return (
		<Tag
			className={classes.element}
			{...rest}
		>
			{children}
		</Tag>
	);
}

export default Title;

export { TitleVariant, TitleSize };

// --- STYLES ---

const styles = cva("font-bold", {
	variants: {
		as: {
			h1: "",
			h2: "",
			h3: "",
			h4: "",
			h5: "",
			h6: "",
		},
		size: {
			[TitleSize.XL]: "text-4xl",
			[TitleSize.LG]: "text-3xl",
			[TitleSize.MD]: "text-2xl",
			[TitleSize.SM]: "text-xl",
		},
		variant: {
			[TitleVariant.UNSTYLED]: "",
			[TitleVariant.SIMPLE]: "",
			[TitleVariant.STYLED]: "",
		},
	},
	compoundVariants: [
		{
			as: As.h1,
			className: "text-4xl",
			variant: TitleVariant.STYLED,
		},
		{
			as: As.h2,
			className: "text-3xl",
			variant: TitleVariant.STYLED,
		},
		{
			as: As.h3,
			className: "text-2xl",
			variant: TitleVariant.STYLED,
		},
		{
			as: As.h4,
			className: "text-xl",
			variant: TitleVariant.STYLED,
		},
		{
			as: As.h5,
			className: "text-lg",
			variant: TitleVariant.STYLED,
		},
		{
			as: As.h6,
			className: "text-base",
			variant: TitleVariant.STYLED,
		},
	],
});
