const esbuild = require("esbuild");

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  format: "cjs",
  platform: "node",
  target: "node18",
  sourcemap: false,
  minify: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
};

if (isWatch) {
  esbuild.context(buildOptions).then((ctx) => ctx.watch());
} else {
  esbuild.build(buildOptions);
}
