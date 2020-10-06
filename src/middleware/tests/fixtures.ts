import Route from "../../types/Routes";

export const secureRoutes: Route[] = [
	{
		method: "PUT",
		path: "/users"
	},
	{
		method: "GET",
		path: "/users/:id"
	}
];

export const ctxValidToken = {
	method: "PUT",
	path: "/users",
	get: (header: string) => "valid"
};

export const ctxInvalidToken = {
	method: "GET",
	path: "/users/:id",
	get: (header: string) => "invalid"
};

export const ctxNoToken = {
	method: "GET",
	path: "/users/:id",
	get: (header: string) => ""
};

export const ctxInsecureRoute = {
	method: "PATCH",
	path: "/insecure"
};
