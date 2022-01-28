interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
	readonly VITE_BASE_SOCKET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
