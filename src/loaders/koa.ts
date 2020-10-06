import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import errorHandling from "../middleware/ErrorHandling";
import * as api from "../api";
import SecureRoutes from "../middleware/SecureRoute";

const router = new Router();

export default async (app: Koa) => {
	app.use(errorHandling);
	app.use(SecureRoutes([]));
	app.use(bodyParser());
	addRoutes();
	app.use(router.routes());

	return { app, router };
};

function addRoutes() {
	api.getHelloWorld(router);
	api.getOauthConnect(router);
	api.getAuth(router);
}
