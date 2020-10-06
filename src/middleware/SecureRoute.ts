import Koa from "koa";
import Route from "../types/Routes";
import { userService } from "../services";
import InError from "../utils/InError";

export default function SecureRoutes(routes: Route[]) {
	return async (ctx: Koa.Context, next: Koa.Next) => {
		try {
			if (routeIsSecure(ctx.method, ctx.path, routes)) {
				console.log(ctx.method, ctx.path);
				const token = ctx.get("x-auth");
				await userService.verifyToken(token);
			}
		} catch (e) {
			if (e.status === 500)
				throw new InError(e.status, e.code, e.message, e.internalError);
			throw new InError(401, "m21", "Unauthorized to process request.");
		}
		await next();
	};
}

export function routeIsSecure(
	method: string,
	path: string,
	secureRoutes: Route[]
) {
	return !!secureRoutes.filter(route => {
		return route.method === method && isSamePath(path, route.path);
	}).length;
}

export function isSamePath(path1: string, path2: string) {
	const path1Elements = path1.split("/");
	const path2Elements = path2.split("/");

	if (path1Elements.length !== path2Elements.length) return false;

	return path1Elements.reduce((previous, current, index) => {
		if (path2Elements[index].includes(":")) return previous && true;
		return previous && current === path2Elements[index];
	}, true);
}
