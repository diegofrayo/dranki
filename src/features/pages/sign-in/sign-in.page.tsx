"use client";

import { useState } from "react";

import cn from "@diegofrayo-pkg/cn";
import type ReactTypes from "@diegofrayo-pkg/types/react";

import { Box, Button, Form, InlineText, Input, Paragraph, Title } from "~/components/primitive";
import { useAuth } from "~/features/auth";
import { useRouter } from "~/features/router";

export default function SignInPage(): ReactTypes.JSXElement {
	// --- HOOKS ---
	const { signInWithMagicLink } = useAuth();
	const { searchParams } = useRouter();

	// --- STATES & REFS ---
	const [email, setEmail] = useState("");
	const [submitState, setSubmitState] = useState<SubmitState>({ kind: "IDLE" });

	// --- HANDLERS ---
	async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		if (submitState.kind === "SUBMITTING") return;

		setSubmitState({ kind: "SUBMITTING" });
		const { error } = await signInWithMagicLink(email.trim());

		if (error) {
			setSubmitState({ kind: "ERROR", message: error.message });
			return;
		}

		setSubmitState({ kind: "SENT" });
	}

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setEmail(event.target.value);
		if (hasErrorFromSubmit) setSubmitState({ kind: "IDLE" });
	}

	// --- COMPUTED STATES ---
	const isSubmitting = submitState.kind === "SUBMITTING";
	const isSent = submitState.kind === "SENT";
	const hasErrorFromURL = submitState.kind === "IDLE" && !!searchParams.get("error");
	const hasErrorFromSubmit = submitState.kind == "ERROR";

	return (
		<Box
			as="section"
			className="flex justify-center py-8"
		>
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

				<Form
					className="flex flex-col gap-3"
					onSubmit={handleFormSubmit}
				>
					<Input
						type="email"
						name="email"
						autoComplete="email"
						placeholder="you@example.com"
						value={email}
						onChange={handleEmailChange}
						disabled={isSubmitting || isSent}
						required
					/>
					<Button
						type="submit"
						disabled={isSubmitting || isSent || email.trim().length === 0}
					>
						{isSubmitting ? "Sending…" : isSent ? "Check your email" : "Send magic link"}
					</Button>

					{isSent && (
						<FormMessage type="SUCCESS">
							Magic link sent to {email}. Open it on this device to finish signing in.
						</FormMessage>
					)}
					{hasErrorFromSubmit && <FormMessage type="SUCCESS">{submitState.message}</FormMessage>}
					{hasErrorFromURL && <FormMessage type="ERROR">{searchParams.get("error")}</FormMessage>}
				</Form>
			</Box>
		</Box>
	);
}

// --- COMPONENTS ---

type FormMessageProps = {
	children: ReactTypes.Children;
	type: "ERROR" | "SUCCESS";
};

function FormMessage({ children, type }: FormMessageProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		root: cn(
			"rounded-md p-3 text-sm",
			type === "ERROR" && "bg-destructive text-white",
			type === "SUCCESS" && "bg-emerald-600 text-white",
		),
	};

	return (
		<Box className={classes.root}>
			<InlineText
				as="strong"
				className="mb-0.5 inline-block capitalize"
			>
				{type}!
			</InlineText>
			<Paragraph>{children}</Paragraph>
		</Box>
	);
}

// --- TYPES ---

type SubmitState =
	| { kind: "IDLE" }
	| { kind: "SUBMITTING" }
	| { kind: "SENT" }
	| { kind: "ERROR"; message: string };
