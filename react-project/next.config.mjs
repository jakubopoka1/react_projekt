import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		root: path.dirname(fileURLToPath(import.meta.url)),
	},
};

export default nextConfig;
