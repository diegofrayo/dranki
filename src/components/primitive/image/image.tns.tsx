import type ReactTypes from "@diegofrayo-pkg/types/react";
import { omit } from "@diegofrayo-pkg/utilities/arrays-and-objects";

// --- PROPS & TYPES ---

type ImgHtmlAttributes = ReactTypes.DOM.HTMLElementAttributes["img"];

interface NativeImageProps extends ImgHtmlAttributes {
	alt: string;
	useNativeElement?: boolean;
}

type ImageProps = NativeImageProps;

// --- COMPONENT DEFINITION ---

function Image(props: ImageProps): ReactTypes.JSXElement {
	return (
		<img
			loading="lazy"
			{...omit(props, ["useNativeElement"])}
			alt={props.alt}
		/>
	);
}

export default Image;
