import Router from "koa-router";

export function getAuth(router: Router) {
	router.get("/cb", ctx => {
		ctx.body = ctx;
	});
}
