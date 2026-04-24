"use client";

import { useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, Input, Paragraph, Title } from "~/components/primitive";
import { useAuth } from "~/features/auth";

export default function SignInForm(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { signInWithMagicLink } = useAuth();

	// --- STATES & REFS ---
	const [email, setEmail] = useState("");
	const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });

	// --- STYLES ---
	const classes = {
		form: cn("flex flex-col gap-3"),
		hint: "text-muted-foreground text-xs",
		error: "text-destructive text-sm",
		success: "text-emerald-600 text-sm",
	};

	// --- HANDLERS ---
	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		if (submitState.kind === "submitting") return;

		setSubmitState({ kind: "submitting" });
		const { error } = await signInWithMagicLink(email.trim());

		if (error) {
			setSubmitState({ kind: "error", message: error.message });
			return;
		}

		setSubmitState({ kind: "sent" });
	}

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setEmail(event.target.value);
		if (submitState.kind === "error") setSubmitState({ kind: "idle" });
	}

	// --- COMPUTED STATES ---
	const isSubmitting = submitState.kind === "submitting";
	const isSent = submitState.kind === "sent";

	return (
		<Box
			as="section"
			className="w-full max-w-sm"
		>
			<Title
				as="h1"
				className="text-foreground mb-1 text-xl font-bold"
			>
				Sign in
			</Title>
			<Paragraph className="text-muted-foreground mb-4 text-sm">
				We&apos;ll email you a magic link for a passwordless sign in.
			</Paragraph>

			<form
				onSubmit={handleFormSubmit}
				className={classes.form}
			>
				<Input
					type="email"
					name="email"
					required
					autoComplete="email"
					placeholder="you@example.com"
					value={email}
					onChange={handleEmailChange}
					disabled={isSubmitting || isSent}
				/>
				<Button
					type="submit"
					disabled={isSubmitting || isSent || email.trim().length === 0}
				>
					{isSubmitting ? "Sending…" : isSent ? "Check your email" : "Send magic link"}
				</Button>

				{submitState.kind === "error" && (
					<Paragraph className={classes.error}>{submitState.message}</Paragraph>
				)}
				{isSent && (
					<Paragraph className={classes.success}>
						Magic link sent to {email}. Open it on this device to finish signing in.
					</Paragraph>
				)}
			</form>
		</Box>
	);
}

// --- TYPES ---

type SubmitState =
	| { kind: "idle" }
	| { kind: "submitting" }
	| { kind: "sent" }
	| { kind: "error"; message: string };
