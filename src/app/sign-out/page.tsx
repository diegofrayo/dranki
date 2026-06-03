import { redirect } from "next/navigation";

import { Routes } from "~/constants/routes";
import { signOut } from "~/features/auth/actions/sign-out";

export default async function SignOutPage(): Promise<never> {
	await signOut();
	return redirect(Routes.INDEX);
}
