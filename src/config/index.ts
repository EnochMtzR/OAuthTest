import dotenv from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

const config = dotenv.config();

if (config.error) {
	throw config.error;
}

const debugMode = process.env.DEBUG === "True";

export default {
	port: !debugMode ? process.env.PORT! : process.env.DEBUG_PORT!,
	serverOptions: {
		cert: readFileSync(resolve(__dirname, process.env.CERTIFICATE!)),
		key: readFileSync(resolve(__dirname, process.env.KEY!)),
		passphrase: process.env.PASSWORD,
		allowHTTP1: true
	},
	verifyUrl: process.env.VERIFY_URL!
};
