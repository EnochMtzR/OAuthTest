/* istanbul ignore file */

import Router from "koa-router";

export function getHelloWorld(router: Router) {
	router.get("/helloWorld", ctx => {
		ctx.body = {
			message: "Hello World!"
		};
	});
}
