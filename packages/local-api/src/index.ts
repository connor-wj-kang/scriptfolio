import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";
import path from "path";

const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    console.log("use proxy");
    app.use(
      createProxyMiddleware({
        target: "http://localhost:5173",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve("local-client/dist/index.html");
    console.log("use static");
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};

export default serve;
