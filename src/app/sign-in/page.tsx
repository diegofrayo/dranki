import { redirect } from "next/navigation";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Routes } from "~/constants/routes";
import { getUser } from "~/features/auth/actions/get-user";
import SignInPage from "~/features/pages/sign-in";
import type { Metadata } from "~/features/router";
import { composePageTitle } from "~/utils/misc";

export default async function SignInPageWrapper(): Promise<ReactTypes.JSXElement> {
	const user = await getUser();

	if (user) {
		return redirect(Routes.INDEX);
	}

	return <SignInPage />;
}

export async function generateMetadata(): Promise<Metadata> {
	return { title: composePageTitle("Sign in") };
}
