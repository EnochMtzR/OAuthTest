/* istanbul ignore file */

export interface InErrorOptions {
	internalError?: any;
	query?: string;
	queryValues?: any;
	schema?: string;
}

export default class InError {
	private _status: number;
	private _code: string;
	private _message: string;
	private _internalError?: any;
	private _query?: string;
	private _queryValues?: string;
	private _schema?: string;

	constructor(
		status: number,
		code: string,
		message: string,
		options?: InErrorOptions
	) {
		this._status = status;
		this._code = code;
		this._message = message;
		this._internalError = options?.internalError;
		this._query = options?.query;
		this._queryValues = JSON.stringify(options?.queryValues);
		this._schema = options?.schema;
	}

	get status() {
		return this._status;
	}

	get code() {
		return this._code;
	}

	get message() {
		return this._message;
	}

	get internalError() {
		return this._internalError;
	}

	get query() {
		return this._query;
	}

	get queryValues() {
		return this._queryValues;
	}

	get schema() {
		return this._schema;
	}
}
