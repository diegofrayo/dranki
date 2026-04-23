import type ReactTypes from "@diegofrayo-pkg/types/react";

import SignInPage from "~/features/pages/sign-in";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default function SignInPageWrapper(): ReactTypes.JSXElement {
	return <SignInPage />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Sign in") };
}
