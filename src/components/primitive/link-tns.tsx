import { cva } from "class-variance-authority";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";
import { mirror, omit } from "@diegofrayo-pkg/utilities/arrays-and-objects";

// --- PROPS & TYPES ---

const LinkVariants = mirror(["UNSTYLED", "SMOOTH", "STYLED"]);
type Variant = keyof typeof LinkVariants;

type AnchorHtmlAttributes = ReactTypes.DOM.HTMLElementAttributes["a"];
type LinkBase = {
	variant?: Variant;
};

interface NativeLinkProps extends AnchorHtmlAttributes, LinkBase {
	children: ReactTypes.Children;
	href: string;
	isExternalLink?: boolean;
}

type LinkProps = NativeLinkProps;

// --- COMPONENT DEFINITION ---

function Link({
	variant = LinkVariants.UNSTYLED,
	className,
	...props
}: LinkProps): ReactTypes.JSXElement {
	// --- UTILS ---
	function composeLinkAttributes(): { target?: "_blank"; rel?: "noreferrer" } {
		if (props.isExternalLink) {
			return { target: "_blank", rel: "noreferrer" };
		}

		return {};
	}

	return (
		<a
			className={cn(`dr-link dr-link--${variant.toLowerCase()}`, styles({ variant }), className)}
			{...composeLinkAttributes()}
			{...omit(props, ["isExternalLink"])}
		>
			{props.children}
		</a>
	);
}

export default Link;

export { LinkVariants };

// --- STYLES ---

const styles = cva("", {
	variants: {
		variant: {
			[LinkVariants.UNSTYLED]: "",
			[LinkVariants.SMOOTH]: "",
			[LinkVariants.STYLED]: "",
		},
	},
});
