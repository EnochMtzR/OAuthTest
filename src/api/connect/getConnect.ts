import Router from "koa-router";
import { Issuer, generators } from "openid-client";

export function getOauthConnect(router: Router) {
	router.get("/OAuth/connect", async ctx => {
		console.log("Found it!");
		const googleIssuer = await Issuer.discover("https://accounts.google.com");

		const client = new googleIssuer.Client({
			client_id:
				"546926258943-o18uka7sm9d3e8bl5fj9aatlrd83m1dn.apps.googleusercontent.com",
			client_secret: "C6UWewOnulCvLWHcBa1FOsol",
			redirect_uris: ["https://localhost:3000/cb"],
			response_types: ["code"]
		});

		const url = client.authorizationUrl({
			scope: "openid email profile"
		});

		ctx.redirect(url);
	});
}
