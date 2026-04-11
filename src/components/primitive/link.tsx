import { cva } from "class-variance-authority";
import FrameworkLink, { type LinkProps as FrameworkLinkComponentProps } from "next/link";

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
	isExternalLink: true;
}

interface FrameworkLinkProps extends FrameworkLinkComponentProps, LinkBase {
	children: ReactTypes.Children;
	href: string;
	isExternalLink?: false;
	className?: string;
}

type LinkProps = NativeLinkProps | FrameworkLinkProps;

// --- COMPONENT DEFINITION ---

function Link({ variant = LinkVariants.UNSTYLED, className, ...props }: LinkProps) {
	// --- UTILS ---
	function composeLinkAttributes(): { target?: "_blank"; rel?: "noreferrer" } {
		if (props.href?.startsWith("#")) return {};

		return { target: "_blank", rel: "noreferrer" };
	}

	if ("isExternalLink" in props && props.isExternalLink === true) {
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

	return (
		<FrameworkLink
			className={cn(`dr-link dr-link--${variant.toLowerCase()}`, styles({ variant }), className)}
			{...omit(props, ["isExternalLink"])}
		>
			{props.children}
		</FrameworkLink>
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
