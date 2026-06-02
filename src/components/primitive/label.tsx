import type ReactTypes from "@diegofrayo-pkg/types/react";

// --- PROPS & TYPES ---

type LabelProps = ReactTypes.DOM.HTMLElementAttributes["label"];

// --- COMPONENT DEFINITION ---

function Label({ children, ...rest }: LabelProps): ReactTypes.JSXElement {
	return <label {...rest}>{children}</label>;
}

export default Label;
