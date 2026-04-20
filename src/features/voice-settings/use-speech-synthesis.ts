"use client";

import { useCallback, useEffect, useState } from "react";

import { voiceSettingsStorage, type VoiceSettings } from "~/features/voice-settings";

export type AudioState = "idle" | "loading" | "playing";

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
	const [audioState, setAudioState] = useState<AudioState>("idle");
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

	// --- COMPUTED STATES ---
	const TARGET_LANG = "en-US";

	// --- HANDLERS ---
	const findVoice = function findVoice(voiceURI: string): SpeechSynthesisVoice | null {
		if (!voiceURI) return null;

		const voice = window.speechSynthesis.getVoices().find((v) => v.voiceURI === voiceURI);

		return voice || null;
	};

	const stop = useCallback(function stop(): void {
		window.speechSynthesis.cancel();
		setAudioState("idle");
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
				setAudioState("playing");
			};
			utterance.onend = (): void => {
				setAudioState("idle");
			};
			utterance.onerror = (): void => {
				setAudioState("idle");
			};

			setAudioState("loading");
			window.speechSynthesis.speak(utterance);
		},
		[text, lang],
	);

	const toggle = useCallback(
		function toggle(): void {
			if (audioState === "idle") {
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
			const filtered = all.filter((voice) => voice.lang === TARGET_LANG);
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
				setAudioState("idle");
			};
		},
		[text],
	);

	return {
		audioState,
		isIdle: audioState === "idle",
		isLoading: audioState === "loading",
		isPlaying: audioState === "playing",
		voices,
		play,
		stop,
		toggle,
	};
}

export default useSpeechSynthesis;
