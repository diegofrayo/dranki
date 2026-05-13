import { tiks } from "@rexa-developer/tiks";

const SoundsService = {
	init(): void {
		tiks.init({
			theme: "crisp",
			volume: 1,
			muted: false,
			respectReducedMotion: true,
		});
	},
	click(): void {
		tiks.click();
	},
	success(): void {
		tiks.success();
	},
	error(): void {
		tiks.error();
	},
	notify(): void {
		tiks.notify();
	},
	toggle(state: boolean): void {
		tiks.toggle(state);
	},
};

export default SoundsService;
