import path from "path";

import { isProductionEnvironment } from "@diegofrayo-pkg/utilities/environment";
import StorageService from "@diegofrayo-pkg/utilities/server/cloud/storage";
import { readFile } from "@diegofrayo-pkg/utilities/server/files";

const DataLoader = {
	get<Data>(filePath: string, config: { contentType: "json" | "md" }): Promise<Data> {
		if (isProductionEnvironment()) {
			return StorageService.downloadFile<Data>(`dranki/${filePath}`, {
				contentType: config.contentType === "json" ? "application/json" : "text/plain",
				isPublicBucket: false,
			});
		}

		if (config.contentType === "json") {
			return readFile<Data>(
				path.join(process.cwd(), "src/data", filePath),
				"json",
			) as Promise<Data>;
		}

		return readFile(path.join(process.cwd(), "src/data", filePath)) as unknown as Promise<Data>;
	},
};

export default DataLoader;
