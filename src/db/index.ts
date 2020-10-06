/* istanbul ignore file */

import { Pool } from "pg";

const pool = new Pool();

pool.on("error", error => {
	throw error;
});

export default {
	query: async <T>(text: string, params?: any[]) => {
		try {
			return await pool.query<T>(text, params);
		} catch (e) {
			throw { ...e };
		}
	}
};
