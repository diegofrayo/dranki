import { IconCatalog, type IconName } from "~/components/primitive";
import type { AudioState } from "~/features/voice-settings";

export function getTtsIconName(state: AudioState): IconName {
	if (state === "PLAYING") return IconCatalog.SQUARE;
	return IconCatalog.VOLUME;
}
