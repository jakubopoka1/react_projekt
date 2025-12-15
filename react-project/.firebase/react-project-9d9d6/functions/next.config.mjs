// next.config.mjs
import { fileURLToPath } from "url";
import path from "path";
var nextConfig = {
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url))
  }
};
var next_config_default = nextConfig;
export {
  next_config_default as default
};
