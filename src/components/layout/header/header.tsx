"use client";

import { useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import { VoiceSettingsModal } from "~/components/common";
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
import { voiceSettingsStorage, type VoiceSettings } from "~/features/voice-settings";

import Breadcrumb from "./components/breadcrumb";

export default function Header(): ReactTypes.JSXElement {
	// --- STATES & REFS ---
	const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);

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

	// --- STYLES ---
	const classes = {
		settingsButton: "ml-auto flex size-10 items-center justify-center",
	};

	return (
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

			{voiceSettingsOpen && (
				<VoiceSettingsModal
					onClose={handleVoiceSettingsClose}
					onSave={handleVoiceSettingsSave}
					visible
				/>
			)}
		</Box>
	);
}
