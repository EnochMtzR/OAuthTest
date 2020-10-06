import { userService } from "../index";
import InError from "../../utils/InError";

describe("Testing userService", () => {
	const validTokenResponse = {
		name: "validUser",
		iat: 123456,
		exp: 123456
	};

	const invalidTokenError = new InError(200, "s311", "Invalid Token.");

	test("should return validTokenResponse when valid token provided", async () => {
		const response = await userService.verifyToken("valid");
		expect(response).toEqual(validTokenResponse);
	});

	test("should throw error when invalidToken is provided", async () => {
		expect.assertions(2);
		let response;

		try {
			response = await userService.verifyToken("invalid");
		} catch (e) {
			expect(e).toEqual(invalidTokenError);
			expect(response).toBeUndefined();
		}
	});
});
