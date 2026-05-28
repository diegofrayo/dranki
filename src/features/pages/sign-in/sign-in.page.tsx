import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box } from "~/components/primitive";

import SignInForm from "./components/sign-in-form";

export default function SignInPage(): ReactTypes.JSXElement {
	return (
		<Box
			as="section"
			className="flex justify-center py-8"
		>
			<SignInForm />
		</Box>
	);
}
