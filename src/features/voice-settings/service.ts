import { BrowserStorageManager } from "@diegofrayo-pkg/browser-storage";

export type VoiceSettings = {
	voiceURI: string | null;
	pitch: number;
	rate: number;
};

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
	voiceURI: null,
	pitch: 1,
	rate: 1,
};

export const VOICE_SETTINGS_STORAGE_KEY = "DR_VOICE_SETTINGS";

export const voiceSettingsStorage = BrowserStorageManager.createItem<VoiceSettings>({
	key: VOICE_SETTINGS_STORAGE_KEY,
	value: DEFAULT_VOICE_SETTINGS,
	readInitialValueFromStorage: true,
	saveDuringCreation: false,
});
