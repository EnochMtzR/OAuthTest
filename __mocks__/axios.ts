const validTokenResponse = {
	name: "validUser",
	iat: 123456,
	exp: 123456
};

const invalidTokenResponse = {
	invalidToken: true
};

export default {
	get: async (url: string) => {
		switch (testUrl(url)) {
			case "is-logged-in":
				if (isTokenValid(url))
					return await getAxiosResponse(validTokenResponse);
				return await getAxiosResponse(invalidTokenResponse);
				break;
		}
	}
};

function testUrl(url: string) {
	if (url.includes("is-logged-in")) return "is-logged-in";
	else return "other";
}

function isTokenValid(url: string) {
	const token = url.split("/")[4];
	return token === "valid";
}

async function getAxiosResponse(data: any) {
	return await {
		data: data
	};
}
