import FrameworkImage, { type ImageProps as FrameworkImageComponentProps } from "next/image";

import type ReactTypes from "@diegofrayo-pkg/types/react";
import { omit } from "@diegofrayo-pkg/utilities/arrays-and-objects";

// --- PROPS & TYPES ---

type ImgHtmlAttributes = ReactTypes.DOM.HTMLElementAttributes["img"];

interface NativeImageProps extends ImgHtmlAttributes {
	alt: string;
	useNativeElement: true;
}

type FrameworkImageProps = FrameworkImageComponentProps & {
	alt: string;
	useNativeElement?: false;
};

export type ImageProps = NativeImageProps | FrameworkImageProps;

// --- COMPONENT DEFINITION ---

function Image(props: ImageProps): ReactTypes.JSXElement {
	if ("useNativeElement" in props && props.useNativeElement === true) {
		return (
			<img
				loading="lazy"
				{...omit(props, ["useNativeElement"])}
				alt={props.alt}
			/>
		);
	}

	return <FrameworkImage {...props} />;
}

export default Image;
