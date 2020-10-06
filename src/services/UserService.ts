import axios from "axios";
import { validateTokenResponse, validateTokenSuccess } from "../types/User";
import cfg from "../config";
import InError from "../utils/InError";

export default class UserService {
	async verifyToken(token: string) {
		let response: validateTokenResponse;
		try {
			response = (
				await axios.get<validateTokenResponse>(`${cfg.verifyUrl}/${token}`)
			).data;
		} catch (e) {
			throw new InError(
				500,
				e.code,
				`Error on get(${cfg.verifyUrl}/:token)`,
				e
			);
		}

		if (response.invalidToken) throw new InError(200, "s311", "Invalid Token.");
		return response as validateTokenSuccess;
	}
}
