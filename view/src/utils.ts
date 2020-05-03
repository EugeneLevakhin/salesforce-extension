
export function getEnvironment(): Environment {
	switch (process.env.NODE_ENV) {
		case 'production':
			return Environment.Production;
		case 'development':
			return Environment.Development;
		default:
			return Environment.Unknown;
	}
}

export enum Environment {
	Unknown,
	Development,
	Production
}