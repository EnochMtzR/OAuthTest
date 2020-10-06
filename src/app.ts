import Koa from "koa";
import { createSecureServer } from "http2";
import chalk from "chalk";
import cfg from "./config";
import * as loaders from "./loaders";

const app = new Koa();

loaders.init(app);

createSecureServer(cfg.serverOptions, app.callback()).listen(cfg.port, () => {
	console.info(
		chalk.bgGreen.black(`Secure Server started listening on port ${cfg.port}.`)
	);
});
