import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// Maps each adapter file (Next.js default) to its TanStack counterpart.
// Vite's resolve.alias works on raw import specifiers, so it can't match
// relative imports like "./image/image.adapter" against absolute paths.
// This plugin resolves first, then swaps — the correct approach.
function frameworkAdapterPlugin(): Plugin {
	const ADAPTER_MAP: Record<string, string> = {
		[path.resolve(__dirname, "src/features/router/use-router.adapter.ts")]: path.resolve(
			__dirname,
			"src/features/router/use-router.tns.ts",
		),
		[path.resolve(__dirname, "src/components/primitive/link/link.adapter.tsx")]: path.resolve(
			__dirname,
			"src/components/primitive/link/link.tns.tsx",
		),
		[path.resolve(__dirname, "src/components/primitive/image/image.adapter.tsx")]: path.resolve(
			__dirname,
			"src/components/primitive/image/image.tns.tsx",
		),
	};

	return {
		name: "framework-adapter",
		enforce: "pre",
		async resolveId(source, importer, options): Promise<string | null> {
			if (!importer) return null;
			const resolved = await this.resolve(source, importer, { skipSelf: true, ...options });
			if (!resolved) return null;
			return ADAPTER_MAP[resolved.id] ?? null;
		},
	};
}

export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [frameworkAdapterPlugin(), tanstackStart(), viteReact()],
});
