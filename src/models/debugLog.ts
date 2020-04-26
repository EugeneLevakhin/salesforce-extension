export interface LogsResult {
	status: number;
	result: DebugLog[];
}

export interface DebugLog {
	attributes: Attributes;
	Id: string;
	Application: string;
	DurationMilliseconds: number;
	Location: string;
	LogLength: number;
	LogUser: LogUser;
	Operation: string;
	Request: string;
	StartTime: string;
	Status: string;
}

export interface Attributes {
	type: string;
	url: string;
}

export interface LogUser {
	attributes: Attributes;
	Name: string;
}