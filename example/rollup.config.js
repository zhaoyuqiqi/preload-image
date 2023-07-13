import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
export default defineConfig([
  {
    output: {
      file: "./dist/index.js",
      format: "esm",
    },
    input: "./src/index.js",
    plugins: [
      resolve({
        extensions: [".ts", ".js", ".json"],
      }),
    ],
  },
]);
