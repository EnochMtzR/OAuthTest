import errorHandling from "../ErrorHandling";

describe("Testing Error Handling", () => {
	test("should respond with error thrown", async () => {
		const error = {
			status: 400,
			code: "m11",
			message: "Bad Request",
			schema: {
				name: "string",
				password: "string"
			}
		};
		const next = async () => {
			throw error;
		};
		const ctx = { status: 0, body: {} };
		const response = await errorHandling(ctx as any, next);
		expect(response?.body).toEqual({
			code: error.code,
			message: error.message,
			schema: error.schema
		});
		expect(response?.status).toBe(error.status);
	});

	test("should respond with default values when no status and message provided", async () => {
		const error = {
			code: "m12",
			msg: "Internal Dependency Error"
		};
		const next = async () => {
			throw error;
		};
		const ctx = { status: 0, body: {} };
		const response = await errorHandling(ctx as any, next);
		expect(response?.body).toEqual({
			code: error.code,
			message: "Internal Server Error"
		});
		expect(response?.status).toBe(500);
	});

	test("should respond with duplicate error when code 23505 received from postgres", async () => {
		const error = {
			code: "23505",
			msg: "Internal Database Error"
		};
		const next = async () => {
			throw error;
		};
		const ctx = { status: 0, body: {} };

		const response = await errorHandling(ctx as any, next);
		expect(response?.body).toEqual({
			code: "m11",
			message: "Cannot duplicate entry"
		});
		expect(response?.status).toBe(200);
	});
});
