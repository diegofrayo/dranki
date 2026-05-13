"use client";

import { useDidMount } from "@diegofrayo-pkg/hooks";

import SoundsService from "./service";

function SoundsProvider(): null {
	useDidMount(() => {
		SoundsService.init();
	});

	return null;
}

export default SoundsProvider;
