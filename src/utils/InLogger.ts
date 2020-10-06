/* istanbul ignore file */

import fs from "fs";
import chalk from "chalk";
import moment from "moment";

import { resolve } from "path";
import InError from "./InError";

export default class InLogger {
	private logFile: fs.WriteStream;

	constructor(fileName: string) {
		try {
			if (!fs.existsSync(resolve(__dirname, "../../log")))
				fs.mkdirSync(resolve(__dirname, "../../log"));
			this.logFile = fs.createWriteStream(
				resolve(__dirname, "../../log", fileName),
				{ flags: "a" }
			);
		} catch (e) {
			console.error(chalk.red(`FATAL ERROR: Could not create log file!\n${e}`));
			process.exit(-1);
		}
	}

	log(error: InError) {
		const logLine = `${moment().format()}| ${
			error.status === 500 ? "ERROR: " : "WARNING: "
		}${error.message}(${error.code})${
			error.query ? `\n\tquery: ${error.query}` : ""
		}${error.queryValues ? `\n\tvalues: ${error.queryValues}` : ""}${
			error.internalError
				? `\n\terror:${JSON.stringify(error.internalError)}`
				: ""
		}\n`;

		if (error.status === 500) {
			this.logFile.write(logLine);
			console.error(chalk.red(logLine));
		} else {
			console.warn(chalk.yellow(logLine));
		}
	}
}
