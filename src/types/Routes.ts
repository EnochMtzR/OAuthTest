export default interface Route {
	method: HTTPMethods;
	path: string;
}

export type HTTPMethods = "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
