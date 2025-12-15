import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",

	images: {
		unoptimized: true,
	},

	turbopack: {
		root: path.dirname(fileURLToPath(import.meta.url)),
	},
};

export default nextConfig;
