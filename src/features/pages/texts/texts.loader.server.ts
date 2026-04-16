import api, { type Text } from "~/api";

export async function loader(): Promise<{ texts: Text[] }> {
	const texts = await api.texts.getTexts();

	return { texts };
}
