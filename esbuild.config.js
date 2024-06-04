import * as esbuild from "esbuild";

import pkg from "./package.json" with { type: "json" };

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: false,
  platform: "neutral",
  sourcemap: true,
  target: "ESNext",
};

await esbuild.build({
  ...options,
  format: "esm",
  outfile: pkg.module,
});

await esbuild.build({
  ...options,
  format: "cjs",
  outfile: pkg.module,
});
