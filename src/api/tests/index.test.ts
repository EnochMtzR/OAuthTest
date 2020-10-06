import Router from "koa-router";

const api = require("../index") as any;

describe("Testing all APIs are exported", () => {
	test("GET /helloWrold should be connected", async () => {
		expect(api.getHelloWorld).toBeDefined();
	});
});
