import SecureRoute, { isSamePath, routeIsSecure } from "../SecureRoute";
import {
	secureRoutes,
	ctxValidToken,
	ctxInsecureRoute,
	ctxInvalidToken,
	ctxNoToken
} from "./fixtures";
import InError from "../../utils/InError";

jest.mock("../../services");

describe("Testing secureRoute Middleware", () => {
	describe("Testing isSamePath()", () => {
		test("should return true when path is equal", () => {
			expect(isSamePath("/users", "/users")).toBeTruthy();
			expect(isSamePath("/users/josias", "/users/:id")).toBeTruthy();
		});

		test("should return false when path is different", () => {
			expect(isSamePath("/users", "/user")).toBeFalsy();
			expect(isSamePath("/users/abner/posts", "/users/:id")).toBeFalsy();
		});
	});

	describe("Testing routesIsSecure()", () => {
		test("should return true, when route was declared secure", () => {
			expect(routeIsSecure("PUT", "/users", secureRoutes)).toBeTruthy();
			expect(routeIsSecure("GET", "/users/Josias", secureRoutes)).toBeTruthy();
		});

		test("should return false, when route was not declared secure", () => {
			expect(routeIsSecure("PATCH", "/users/:id", [])).toBeFalsy();
			expect(routeIsSecure("PUT", "/users/:id", secureRoutes)).toBeFalsy();
			expect(routeIsSecure("POST", "/users", secureRoutes)).toBeFalsy();
		});
	});

	describe("Testing SecureRoute()", () => {
		const verifyRoutes = SecureRoute(secureRoutes);

		let next: () => Promise<any>;

		beforeEach(() => {
			next = jest.fn(async () => await "");
		});

		test("should call Next when valid token provided", async () => {
			await verifyRoutes(ctxValidToken as any, next);
			expect(next).toHaveBeenCalled();
		});

		test("should call Next when insecure route is requested", async () => {
			verifyRoutes(ctxInsecureRoute as any, next);
			expect(next).toHaveBeenCalled();
		});

		test("should thorw error when invalid token is provided", async () => {
			expect.assertions(2);

			try {
				await verifyRoutes(ctxInvalidToken as any, next);
			} catch (e) {
				expect(next).not.toHaveBeenCalled();
				expect(e).toEqual(
					new InError(401, "m21", "Unauthorized to process request.")
				);
			}
		});

		test("should thorw error when no token is provided", async () => {
			expect.assertions(2);

			try {
				await verifyRoutes(ctxNoToken as any, next);
			} catch (e) {
				expect(next).not.toHaveBeenCalled();
				expect(e).toEqual(
					new InError(401, "m21", "Unauthorized to process request.")
				);
			}
		});
	});
});
