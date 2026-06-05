import api from "~/api";
import type { Text } from "~/api/types";

export async function loader(): Promise<{ texts: Text[] }> {
	const texts = await api().texts.getTexts();

	return { texts };
}
