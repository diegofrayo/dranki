"use client";

import { useEffect, useState } from "react";

const TARGET_LANG = "en-US";

function useVoices(): SpeechSynthesisVoice[] {
	// --- STATES & REFS ---
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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

	return voices;
}

export default useVoices;
