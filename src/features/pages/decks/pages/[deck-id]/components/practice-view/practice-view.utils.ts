export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		if (shuffled[i] !== undefined && shuffled[j] !== undefined) {
			shuffled[i] = shuffled[j];
			// @ts-expect-error idk
			shuffled[j] = shuffled[i];
		}
	}

	return shuffled;
}
