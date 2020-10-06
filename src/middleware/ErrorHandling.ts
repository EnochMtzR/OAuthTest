import Koa from "koa";
import InLoger from "../utils/InLogger";

const logger = new InLoger("InCatalogs.log");

export default async function errorHandling(ctx: Koa.Context, next: Koa.Next) {
	try {
		await next();
	} catch (e) {
		switch (e.code) {
			case "23505":
				ctx.status = 200;
				ctx.body = {
					code: "m11",
					message: "Cannot duplicate entry"
				};
				break;
			default:
				ctx.status = e.status || 500;
				ctx.body = {
					code: e.code,
					message:
						e.status !== 500 && e.message ? e.message : "Internal Server Error",
					schema: e.schema
				};
		}

		logger.log(e);

		return ctx;
	}
}
