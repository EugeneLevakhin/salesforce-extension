import { DebugLog } from "../models/debugLog";

export interface IDebugLogsService {
	getLogs(): Promise<DebugLog[]>;
	getLog(logId: string): Promise<string>;
}