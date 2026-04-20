import { BrowserStorageManager } from "@diegofrayo-pkg/browser-storage";

export type VoiceSettings = {
	voiceURI: string | null;
	pitch: number;
	rate: number;
};

export const DEFAULT_VOICE_SETTINGS = {
	voiceURI: null,
	pitch: 1,
	rate: 1,
};

export const voiceSettingsStorage = BrowserStorageManager.createItem<VoiceSettings>({
	key: "DR_VOICE_SETTINGS",
	value: DEFAULT_VOICE_SETTINGS,
	readInitialValueFromStorage: true,
	saveDuringCreation: true,
});
