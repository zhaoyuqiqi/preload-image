import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
export default defineConfig([
  {
    output: {
      file: "./dist/index.js",
      format: "esm",
    },
    input: "./src/index.ts",
    plugins: [
      typescript({
        compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
        module: "esnext",
      }),
    ],
  },
]);
