import { isArrayBufferView } from "util/types";
import { get, head, put, remove } from "@tigrisdata/storage";

import { isBlob, isNotEmptyString } from "../../../validator";
import { throwError } from "../../errors";
import { jsonToBlob } from "../files";

async function uploadFile(
	storageFilePath: string,
	file: Blob | Buffer | Record<string, unknown> | Array<unknown>,
	config: RequestConfig,
): Promise<string> {
	const result = await put(
		storageFilePath,
		isBlob(file) || isArrayBufferView(file) ? file : jsonToBlob(file),
		generateConfig(config),
	);

	if (result.error) {
		throw result.error;
	}

	return result.data.url;
}

async function downloadFile<File>(storageFilePath: string, config: RequestConfig): Promise<File> {
	const result = await get(storageFilePath, "string", generateConfig(config));

	if (result.error) {
		throw result.error;
	}

	if (config.contentType?.includes("json")) {
		return JSON.parse(result.data) as File;
	}

	return result.data as File;
}

async function getFileURL(storageFilePath: string, config: RequestConfig): Promise<string> {
	const result = await head(storageFilePath, generateConfig(config));

	if (result.data) {
		return result.data.url;
	}

	throw result.error;
}

async function fileExists(storageFilePath: string, config: RequestConfig): Promise<boolean> {
	return isNotEmptyString(await getFileURL(storageFilePath, config));
}

async function deleteFile(storageFilePath: string, config: RequestConfig): Promise<void> {
	const result = await remove(storageFilePath, generateConfig(config));

	if (result.error) throw result.error;
}

const StorageService = {
	uploadFile,
	downloadFile,
	fileExists,
	deleteFile,
	getFileURL,
};

export default StorageService;

// --- UTILS ---

function generateConfig(config: RequestConfig): TigrisRequestConfig {
	return {
		allowOverwrite: true,
		contentType: config.contentType || "application/json",
		access: config.isPublicBucket ? "public" : "private",
		config: {
			accessKeyId: process.env["STORAGE_KEY_ID"] || throwError("Invalid 'STORAGE_KEY_ID' env var."),
			secretAccessKey:
				process.env["STORAGE_SECRET_ACCESS"] ||
				throwError("Invalid 'STORAGE_SECRET_ACCESS' env var."),
			bucket: config.isPublicBucket ? "dfrz-public" : "dfrz-private",
		},
	} as const;
}

// --- TYPES ---

type RequestConfig = {
	isPublicBucket: boolean;
	contentType?: "application/json" | "image/jpeg" | "text/plain";
};

type TigrisRequestConfig = {
	allowOverwrite: boolean;
	contentType: NonNullable<RequestConfig["contentType"]>;
	access: "public" | "private";
	config: {
		accessKeyId: string;
		secretAccessKey: string;
		bucket: "dfrz-private" | "dfrz-public";
	};
};
