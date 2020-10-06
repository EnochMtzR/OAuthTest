import Koa from "koa";
import loadKoa from "./koa";

export async function init(app: Koa) {
	await loadKoa(app);
}
