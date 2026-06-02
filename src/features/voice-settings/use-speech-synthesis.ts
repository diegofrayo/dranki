"use client";

import { useCallback, useEffect, useState } from "react";

import { replaceAll } from "@diegofrayo-pkg/utilities/strings";

import { voiceSettingsStorage, type VoiceSettings } from "~/features/voice-settings";

export type AudioState = "IDLE" | "LOADING" | "PLAYING";

type UseSpeechSynthesisOptions = {
	text: string;
	lang?: string;
};

type UseSpeechSynthesisResult = {
	audioState: AudioState;
	isIdle: boolean;
	isLoading: boolean;
	isPlaying: boolean;
	voices: SpeechSynthesisVoice[];
	play: (voiceSettings?: VoiceSettings) => void;
	stop: () => void;
	toggle: () => void;
};

function useSpeechSynthesis({
	text,
	lang = "en-US",
}: UseSpeechSynthesisOptions): UseSpeechSynthesisResult {
	// --- STATES & REFS ---
	const [audioState, setAudioState] = useState<AudioState>("IDLE");
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

	// --- COMPUTED STATES ---
	const TARGET_LANG = "en-US";

	// --- UTILS ---
	const findVoice = function findVoice(voiceURI: string): SpeechSynthesisVoice | null {
		if (!voiceURI) return null;

		const voice = window.speechSynthesis.getVoices().find((v) => v.voiceURI === voiceURI);

		return voice || null;
	};

	// --- HANDLERS ---
	const stop = useCallback(function stop(): void {
		window.speechSynthesis.cancel();
		setAudioState("IDLE");
	}, []);

	const play: UseSpeechSynthesisResult["play"] = useCallback(
		function play(voiceSettings) {
			if (!text) return;

			window.speechSynthesis.cancel();

			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = lang;

			const settings = voiceSettings || voiceSettingsStorage.get();
			utterance.pitch = settings.pitch;
			utterance.rate = settings.rate;
			utterance.voice = findVoice(settings.voiceURI || "");

			utterance.onstart = (): void => {
				setAudioState("PLAYING");
			};
			utterance.onend = (): void => {
				setAudioState("IDLE");
			};
			utterance.onerror = (): void => {
				setAudioState("IDLE");
			};

			setAudioState("LOADING");
			window.speechSynthesis.speak(utterance);
		},
		[text, lang],
	);

	const toggle = useCallback(
		function toggle(): void {
			if (audioState === "IDLE") {
				play();
			} else {
				stop();
			}
		},
		[audioState, play, stop],
	);

	// --- EFFECTS ---
	useEffect(function loadVoices() {
		if (typeof window === "undefined" || !window.speechSynthesis) return;

		function updateVoices(): void {
			const all = window.speechSynthesis.getVoices();
			const filtered = all.filter((voice) => replaceAll(voice.lang, "_", "-") === TARGET_LANG);
			setVoices(filtered);
		}

		updateVoices();
		window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

		return (): void => {
			window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
		};
	}, []);

	useEffect(
		function cancelSpeechOnTextChange() {
			return (): void => {
				window.speechSynthesis.cancel();
				setAudioState("IDLE");
			};
		},
		[text],
	);

	return {
		audioState,
		isIdle: audioState === "IDLE",
		isLoading: audioState === "LOADING",
		isPlaying: audioState === "PLAYING",
		voices,
		play,
		stop,
		toggle,
	};
}

export default useSpeechSynthesis;
