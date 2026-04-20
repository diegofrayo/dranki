"use client";

import { useEffect, useRef, useState } from "react";

import type ReactTypes from "@diegofrayo-pkg/types/react";

import {
	Box,
	Button,
	ButtonSize,
	ButtonVariant,
	Icon,
	IconCatalog,
	InlineText,
	Modal,
	Paragraph,
	Select,
	Slider,
	Title,
} from "~/components/primitive";


import { DEFAULT_VOICE_SETTINGS, voiceSettingsStorage, type VoiceSettings } from "./service";
import useVoices from "./use-voices";

// --- PROPS & TYPES ---

type VoiceSettingsModalProps = {
	visible: boolean;
	onClose: () => void;
	onSave: (settings: VoiceSettings) => void;
};

// --- COMPONENT DEFINITION ---

function VoiceSettingsModal({
	visible,
	onClose,
	onSave,
}: VoiceSettingsModalProps): ReactTypes.JSXElement {
	// --- HOOKS ---
	const voices = useVoices();

	// --- STATES & REFS ---
	const [voiceURI, setVoiceURI] = useState<string | null>(null);
	const [pitch, setPitch] = useState<number>(DEFAULT_VOICE_SETTINGS.pitch);
	const [rate, setRate] = useState<number>(DEFAULT_VOICE_SETTINGS.rate);
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

	// --- COMPUTED STATES ---
	const voiceItems = voices.map((voice) => ({
		label: `${voice.name} (${voice.lang})`,
		value: voice.voiceURI,
	}));
	const selectValue = voiceURI ?? "";

	// --- STYLES ---
	const classes = {
		popup: "w-[min(92vw,28rem)] rounded-2xl bg-card p-6 shadow-2xl",
		field: "mb-5",
		label: "text-foreground mb-2 block text-sm font-semibold",
		valueHint: "text-muted-foreground text-xs",
	};

	// --- HANDLERS ---
	function handleVoiceChange(value: string | null): void {
		setVoiceURI(value);
	}

	function handlePitchChange(value: number): void {
		setPitch(value);
	}

	function handleRateChange(value: number): void {
		setRate(value);
	}

	function handleTestPlayClick(): void {
		if (typeof window === "undefined" || !window.speechSynthesis) return;

		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(TEST_PHRASE);
		utterance.lang = "en-US";
		utterance.pitch = pitch;
		utterance.rate = rate;

		const selectedVoice = voices.find((voice) => voice.voiceURI === voiceURI);
		if (selectedVoice) {
			utterance.voice = selectedVoice;
		}

		utteranceRef.current = utterance;
		window.speechSynthesis.speak(utterance);
	}

	function handleSaveClick(): void {
		onSave({ voiceURI, pitch, rate });
	}

	function handleCancelClick(): void {
		stopSpeaking();
		onClose();
	}

	function handleCloseFromModal(): void {
		stopSpeaking();
		onClose();
	}

	// --- EFFECTS ---
	useEffect(
		function hydrateFromStorageOnOpen() {
			if (!visible) return;
			const stored = voiceSettingsStorage.get();
			setVoiceURI(stored.voiceURI);
			setPitch(stored.pitch);
			setRate(stored.rate);
		},
		[visible],
	);

	useEffect(
		function ensureVoiceSelected() {
			if (voiceURI || voices.length === 0) return;
			const firstVoice = voices[0];
			if (firstVoice) setVoiceURI(firstVoice.voiceURI);
		},
		[voiceURI, voices],
	);

	useEffect(function cancelSpeechOnUnmount() {
		return (): void => {
			if (typeof window !== "undefined" && window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
		};
	}, []);

	return (
		<Modal
			visible={visible}
			className={classes.popup}
			onCloseHandler={handleCloseFromModal}
		>
			<ModalHeader onClose={handleCloseFromModal} />

			<Box className={classes.field}>
				<label className={classes.label}>Voice</label>
				<Select
					items={voiceItems}
					value={selectValue}
					placeholder={voices.length === 0 ? "No en-US voices available" : "Select a voice"}
					disabled={voices.length === 0}
					onValueChange={handleVoiceChange}
				/>
			</Box>

			<Box className={classes.field}>
				<Box className="mb-2 flex items-center justify-between">
					<label className={classes.label}>Speed</label>
					<InlineText className={classes.valueHint}>{rate.toFixed(1)}x</InlineText>
				</Box>
				<Slider
					value={rate}
					min={RATE_MIN}
					max={RATE_MAX}
					step={RATE_STEP}
					onValueChange={handleRateChange}
				/>
			</Box>

			<Box className={classes.field}>
				<Box className="mb-2 flex items-center justify-between">
					<label className={classes.label}>Pitch</label>
					<InlineText className={classes.valueHint}>{pitch.toFixed(1)}</InlineText>
				</Box>
				<Slider
					value={pitch}
					min={PITCH_MIN}
					max={PITCH_MAX}
					step={PITCH_STEP}
					onValueChange={handlePitchChange}
				/>
			</Box>

			<TestPreview
				disabled={!voiceURI}
				onPlay={handleTestPlayClick}
			/>

			<ModalActions
				onCancel={handleCancelClick}
				onSave={handleSaveClick}
			/>
		</Modal>
	);
}

export default VoiceSettingsModal;

// --- CONSTANTS ---

const TEST_PHRASE = "Hello, this is a preview of the selected voice.";
const PITCH_MIN = 0;
const PITCH_MAX = 2;
const PITCH_STEP = 0.1;
const RATE_MIN = 0.5;
const RATE_MAX = 2;
const RATE_STEP = 0.1;

// --- UTILS ---

function stopSpeaking(): void {
	if (typeof window !== "undefined" && window.speechSynthesis) {
		window.speechSynthesis.cancel();
	}
}

// --- COMPONENTS ---

type ModalHeaderProps = {
	onClose: () => void;
};

function ModalHeader({ onClose }: ModalHeaderProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		header: "mb-5 flex items-start justify-between gap-3",
		title: "text-foreground text-lg font-bold",
		closeButton:
			"text-muted-foreground hover:text-foreground -mt-1 -mr-1 cursor-pointer rounded p-1 transition-colors",
	};

	// --- HANDLERS ---
	function handleCloseClick(): void {
		onClose();
	}

	return (
		<Box className={classes.header}>
			<Title
				as="h2"
				className={classes.title}
			>
				Voice settings
			</Title>
			<button
				type="button"
				className={classes.closeButton}
				aria-label="Close"
				onClick={handleCloseClick}
			>
				<Icon name={IconCatalog.X_MARK} />
			</button>
		</Box>
	);
}

type ModalActionsProps = {
	onCancel: () => void;
	onSave: () => void;
};

function ModalActions({ onCancel, onSave }: ModalActionsProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		actions: "flex gap-3",
		cancelButton: "flex-1",
		saveButton: "flex-1",
	};

	// --- HANDLERS ---
	function handleCancelClick(): void {
		onCancel();
	}

	function handleSaveClick(): void {
		onSave();
	}

	return (
		<Box className={classes.actions}>
			<Button
				variant={ButtonVariant.OUTLINE}
				className={classes.cancelButton}
				onClick={handleCancelClick}
			>
				Cancel
			</Button>
			<Button
				variant={ButtonVariant.DEFAULT}
				className={classes.saveButton}
				onClick={handleSaveClick}
			>
				Save
			</Button>
		</Box>
	);
}

type TestPreviewProps = {
	disabled: boolean;
	onPlay: () => void;
};

function TestPreview({ disabled, onPlay }: TestPreviewProps): ReactTypes.JSXElement {
	// --- STYLES ---
	const classes = {
		testSection: "bg-muted/40 mb-5 rounded-lg p-3",
		testPhrase: "text-foreground mb-2 text-sm italic",
		testControls: "flex justify-end",
	};

	// --- HANDLERS ---
	function handlePlayClick(): void {
		onPlay();
	}

	return (
		<Box className={classes.testSection}>
			<Paragraph className={classes.testPhrase}>&ldquo;{TEST_PHRASE}&rdquo;</Paragraph>
			<Box className={classes.testControls}>
				<Button
					variant={ButtonVariant.SECONDARY}
					size={ButtonSize.SM}
					disabled={disabled}
					onClick={handlePlayClick}
				>
					<Icon
						name={IconCatalog.PLAY}
						size={14}
					/>
					Play preview
				</Button>
			</Box>
		</Box>
	);
}
