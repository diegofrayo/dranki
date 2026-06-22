import { isArrayBufferView } from "util/types";
import { StorageClient } from "@supabase/storage-js";

import EnvVars from "~/features/env";

import { isBlob } from "../../../validator";
import { throwError } from "../../errors";
import { jsonToBlob } from "../files";

async function uploadFile(
	storageFilePath: string,
	file: Blob | Buffer | Record<string, unknown> | Array<unknown>,
	config: RequestConfig,
): Promise<string> {
	const bucket = resolveBucket(config);
	const fileData = isBlob(file) || isArrayBufferView(file) ? file : jsonToBlob(file);

	const { error } = await createClient()
		.from(bucket)
		.upload(storageFilePath, fileData, {
			contentType: config.contentType || "application/json",
			upsert: true,
		});

	if (error) throw error;

	return getFileURL(storageFilePath, config);
}

async function downloadFile<File>(storageFilePath: string, config: RequestConfig): Promise<File> {
	const { data, error } = await createClient()
		.from(resolveBucket(config))
		.download(storageFilePath);

	if (error) throw error;

	const text = await data.text();

	if (config.contentType?.includes("json")) {
		return JSON.parse(text) as File;
	}

	return text as File;
}

async function getFileURL(storageFilePath: string, config: RequestConfig): Promise<string> {
	const bucket = resolveBucket(config);

	if (config.isPublicBucket) {
		const { data } = createClient().from(bucket).getPublicUrl(storageFilePath);
		return data.publicUrl;
	}

	const { data, error } = await createClient().from(bucket).createSignedUrl(storageFilePath, 3600);

	if (error) throw error;

	return data.signedUrl;
}

async function fileExists(storageFilePath: string, config: RequestConfig): Promise<boolean> {
	const bucket = resolveBucket(config);
	const parts = storageFilePath.split("/");
	const filename = parts.pop()!;
	const dir = parts.join("/");

	const { data, error } = await createClient()
		.from(bucket)
		.list(dir || undefined, { search: filename });

	if (error) throw error;

	return data.some((f: { name: string }) => f.name === filename);
}

async function deleteFile(storageFilePath: string, config: RequestConfig): Promise<void> {
	const { error } = await createClient().from(resolveBucket(config)).remove([storageFilePath]);

	if (error) throw error;
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

function createClient(): StorageClient {
	const url = EnvVars.PUBLIC_SUPABASE_URL;
	const key =
		EnvVars.SUPABASE_SERVICE_ROLE_KEY || throwError("Invalid 'SUPABASE_SERVICE_ROLE_KEY' env var.");

	return new StorageClient(`${url}/storage/v1`, {
		apikey: key,
		Authorization: `Bearer ${key}`,
	});
}

function resolveBucket(config: RequestConfig): "dfrz-public" | "dfrz-private" {
	return config.isPublicBucket ? "dfrz-public" : "dfrz-private";
}

// --- TYPES ---

type RequestConfig = {
	isPublicBucket: boolean;
	contentType?: "application/json" | "image/jpeg" | "text/plain";
};
