export interface validateTokenSuccess {
	name: string;
	iat: number;
	exp: number;
}

export interface validateTokenError {
	invalidToken: boolean;
}

export type validateTokenResponse = validateTokenError & validateTokenSuccess;
