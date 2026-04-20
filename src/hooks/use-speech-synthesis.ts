"use client";

import { useCallback, useEffect, useState } from "react";

import { voiceSettingsStorage } from "~/features/voice-settings";

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
	play: () => void;
	stop: () => void;
	toggle: () => void;
};

function useSpeechSynthesis({
	text,
	lang = "en-US",
}: UseSpeechSynthesisOptions): UseSpeechSynthesisResult {
	// --- STATES & REFS ---
	const [audioState, setAudioState] = useState<AudioState>("idle");

	// --- HANDLERS ---
	const stop = useCallback(function stop(): void {
		window.speechSynthesis.cancel();
		setAudioState("idle");
	}, []);

	const play = useCallback(
		function play(): void {
			if (!text) return;

			window.speechSynthesis.cancel();

			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = lang;

			const settings = voiceSettingsStorage.get();
			utterance.pitch = settings.pitch;
			utterance.rate = settings.rate;
			if (settings.voiceURI) {
				const voice = window.speechSynthesis
					.getVoices()
					.find((v) => v.voiceURI === settings.voiceURI);
				if (voice) utterance.voice = voice;
			}

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
		play,
		stop,
		toggle,
	};
}

export default useSpeechSynthesis;
