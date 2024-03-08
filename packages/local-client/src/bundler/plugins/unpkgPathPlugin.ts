import esbuild from "esbuild-wasm";

const unpkgPathPlugin = {
  name: "unpkgPathPlugin",
  setup(build: esbuild.PluginBuild) {
    // Handle root entry file of 'index.js'
    build.onResolve({ filter: /(^index\.js$)/ }, () => {
      return { path: "index.js", namespace: "a" };
    });

    // Handle relative paths in a module
    build.onResolve({ filter: /^\.+\// }, (args) => {
      return {
        namespace: "a",
        path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
          .href,
      };
    });

    // Handle main file of a module
    build.onResolve({ filter: /.*/ }, async (args) => {
      return {
        namespace: "a",
        path: `https://unpkg.com/${args.path}`,
      };
    });
  },
};

export { unpkgPathPlugin };
