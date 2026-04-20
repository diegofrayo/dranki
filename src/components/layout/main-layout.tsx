"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonVariant,
	Icon,
	IconCatalog,
	Image,
	Link,
	Paragraph,
	Title,
} from "~/components/primitive";
import { PROJECT_METADATA, Routes } from "~/constants";
import {
	VoiceSettingsModal,
	voiceSettingsStorage,
	type VoiceSettings,
} from "~/features/voice-settings";

import Breadcrumb from "./breadcrumb";

type MainLayoutProps = {
	children: ReactTypes.Children;
};

function MainLayout({ children }: MainLayoutProps): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);

	// --- STYLES ---
	const classes = {
		settingsButton: "ml-auto flex size-10 items-center justify-center",
	};

	// --- HANDLERS ---
	function handleSettingsClick(): void {
		setVoiceSettingsOpen(true);
	}

	function handleVoiceSettingsClose(): void {
		setVoiceSettingsOpen(false);
	}

	function handleVoiceSettingsSave(settings: VoiceSettings): void {
		voiceSettingsStorage.set(settings);
		setVoiceSettingsOpen(false);
	}

	return (
		<Box
			as="main"
			className="flex min-h-screen flex-col"
		>
			<Box
				as="header"
				className="sticky top-0 z-40 w-full shrink-0"
			>
				<Box className="border-border bg-background/80 border-b backdrop-blur-md">
					<Box className="mx-auto flex max-w-xl items-center gap-3 px-4 py-4">
						<Link
							href={Routes.INDEX}
							className="block"
						>
							<Image
								src="/logo/logo.png"
								alt="dranki logo"
								className="size-12"
								width={32}
								height={32}
							/>
						</Link>
						<Box>
							<Title
								as="h1"
								className="text-foreground text-2xl font-extrabold"
							>
								{PROJECT_METADATA.appName}
							</Title>
							<Paragraph className="text-muted-foreground text-sm">
								{PROJECT_METADATA.slogan}
							</Paragraph>
						</Box>
						<Button
							aria-label="Open voice settings"
							className={classes.settingsButton}
							variant={ButtonVariant.GHOST}
							onClick={handleSettingsClick}
						>
							<Icon name={IconCatalog.SETTINGS} />
						</Button>
					</Box>
				</Box>

				<Box className="bg-background z-40 mx-auto w-full max-w-xl px-4">
					<Breadcrumb />
				</Box>
			</Box>

			<Box
				as="section"
				className="mx-auto min-h-0 w-full max-w-xl flex-1 px-4 py-6"
			>
				{children}
			</Box>

			<Box
				as="footer"
				className="border-border mt-8 shrink-0 border-t py-3"
			>
				<Paragraph className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-sm">
					<Icon
						name={IconCatalog.CODE_2}
						className="relative -top-px size-3.5"
					/>
					{"Coded by "}
					<Link
						href="https://diegofrayo.dev"
						className="text-foreground font-bold underline underline-offset-2"
						isExternalLink
					>
						Diego Rayo
					</Link>
				</Paragraph>
			</Box>

			<VoiceSettingsModal
				visible={voiceSettingsOpen}
				onClose={handleVoiceSettingsClose}
				onSave={handleVoiceSettingsSave}
			/>
		</Box>
	);
}

export default MainLayout;
