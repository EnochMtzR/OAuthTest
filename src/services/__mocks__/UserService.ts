export default class UserService {
	async verifyToken(token: string) {
		console.log("userService Mocked");
		return new Promise((resolve, reject) => {
			if (token === "valid") resolve(true);
			reject({
				error: "InvalidToken"
			});
		});
	}
}
