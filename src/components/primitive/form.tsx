import type ReactTypes from "@diegofrayo-pkg/types/react";

// --- PROPS & TYPES ---

type FormProps = ReactTypes.DOM.HTMLElementAttributes["form"];

// --- COMPONENT DEFINITION ---

function Form({ children, ...rest }: FormProps): ReactTypes.JSXElement {
	return <form {...rest}>{children}</form>;
}

export default Form;
