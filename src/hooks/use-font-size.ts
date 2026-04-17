import { useBrowserStorage } from "@diegofrayo-pkg/browser-storage";

const DEFAULT_FONT_SIZE_INDEX = 1;
const FONT_SIZES = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"] as const;

type FontSize = (typeof FONT_SIZES)[number];

type UseFontSizeOptions = {
	storageKey: string;
};

type UseFontSizeResult = {
	fontSize: FontSize;
	canIncreaseFontSize: boolean;
	canDecreaseFontSize: boolean;
	increaseFontSize: () => void;
	decreaseFontSize: () => void;
};

export type FontSizeConfig = UseFontSizeResult;

function useFontSize({ storageKey }: UseFontSizeOptions): UseFontSizeResult {
	const [fontSizeIndex, setFontSizeIndex] = useBrowserStorage<number>({
		key: storageKey,
		value: DEFAULT_FONT_SIZE_INDEX,
		readInitialValueFromStorage: true,
		saveDuringCreation: true,
	});

	function increase(): void {
		setFontSizeIndex((prev: number) => Math.min(FONT_SIZES.length - 1, prev + 1));
	}

	function decrease(): void {
		setFontSizeIndex((prev: number) => Math.max(0, prev - 1));
	}

	return {
		fontSize: FONT_SIZES[fontSizeIndex]!,
		canIncreaseFontSize: fontSizeIndex < FONT_SIZES.length - 1,
		canDecreaseFontSize: fontSizeIndex > 0,
		increaseFontSize: increase,
		decreaseFontSize: decrease,
	};
}

export default useFontSize;
