import { tiks } from "@rexa-developer/tiks";

export const sounds = {
	init(): void {
		tiks.init();
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
