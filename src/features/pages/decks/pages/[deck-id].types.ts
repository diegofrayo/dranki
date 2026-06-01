import type { Deck, DeckPhrase } from "~/api";

export type DeckSessionContextValue = {
	deck: Deck;
	endTime: string;
	currentIndex: number;
	phase: DeckPhase;
	phrases: DeckPhrase[];
	practiceMode: PracticeMode;
	practiceMoreCount: number;
	recognizedCount: number;
	autoPlayAudio: boolean;
	showSentenceByDefault: boolean;
	showTranslationByDefault: boolean;
	startTime: string;
	clearSession: () => void;
	markPracticeMore: (config: { enableSounds: boolean }) => void;
	markRecognized: (config: { enableSounds: boolean }) => void;
	setAutoPlayAudio: (value: boolean) => void;
	setDeckPhase: (value: DeckPhase) => void;
	setPracticeMode: (mode: PracticeMode) => void;
	setShowSentenceByDefault: (value: boolean) => void;
	setShowTranslationByDefault: (value: boolean) => void;
	startSession: () => void;
};

export type DeckPhase = "OVERVIEW" | "PRACTICE" | "RESULTS";

export type PracticeMode = "LISTENING" | "VOCABULARY" | "REGULAR" | "CUSTOM";
