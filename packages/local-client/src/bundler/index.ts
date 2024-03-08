import { fetchPlugin, unpkgPathPlugin } from "@/bundler/plugins";
import esbuild from "esbuild-wasm";

let waiting: Promise<void>;
const startService = async () => {
  waiting = esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
  });
};

const startBuild = async (rawCode: string) => {
  await waiting;

  return await esbuild
    .build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin, fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    })
    .then((result) => {
      return {
        code: result.outputFiles[0].text,
        err: "",
      };
    })
    .catch((err) => {
      return {
        code: "",
        err: (err as Error).message,
      };
    });
};

export { startService, startBuild };
