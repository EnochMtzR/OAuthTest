import koaLoader from "../koa";

jest.mock("../../middleware/ErrorHandling.ts");
jest.mock("../../middleware/SecureRoute.ts");
jest.mock("../../api");

import SecureRoutes from "../../middleware/SecureRoute";
import errorHandling from "../../middleware/ErrorHandling";
import bodyParser from "koa-bodyparser";
import Routes from "../../types/Routes";
import * as api from "../../api";

const app = {
	use: jest.fn((middleWare: Function) => {
		//DoSomething
	})
} as any;

describe("Testing Koa Loader", () => {
	describe("Testing SecureRoutes are enabled", () => {
		const secureRoutes: Routes[] = [];
		test("Should call secureRoutes on all securedRoutes", done => {
			koaLoader(app).then(() => {
				expect(SecureRoutes).toHaveBeenCalledWith(secureRoutes);
				done();
			});
		});
	});

	describe("Testing ErrorHandling enabled", () => {
		test("should call ErrorHandling middleWare", done => {
			koaLoader(app).then(() => {
				expect(app.use).toHaveBeenCalledWith(errorHandling);
				done();
			});
		});
	});

	describe("Testing BodyParser enabled", () => {
		test("should call BodyParser middleware", done => {
			koaLoader(app).then(() => {
				expect(bodyParser).toHaveBeenCalled();
				done();
			});
		});
	});

	describe("Testing router enabled", () => {
		test("should call router middleware", async () => {
			const ctx = await koaLoader(app);
			expect(ctx.router.routes).toHaveBeenCalled();
		});
	});

	describe("Testing all routes should be connected", () => {
		test("GET /helloWorld should be connected", async done => {
			koaLoader(app).then(ctx => {
				expect(api.getHelloWorld).toHaveBeenCalledWith(ctx.router);
				done();
			});
		});
	});
});
