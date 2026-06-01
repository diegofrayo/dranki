import { useSound as useSoundRaw, type SoundHookReturn } from "react-sounds";

import type { Sounds } from "./constants";

export function useSound(sound: Sounds): UseSoundReturn {
	const { play, ...rest } = useSoundRaw(sound);

	return [play, rest];
}

// --- TYPES ---

type UseSoundReturn = [SoundHookReturn["play"], Omit<SoundHookReturn, "play">];
