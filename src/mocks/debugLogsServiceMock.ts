import logsJson from "./logs.json";
import { DebugLog } from "../models/debugLog";
import { IDebugLogsService } from "../services/iDebugLogsService";

export class DebugLogsServiceMock implements IDebugLogsService {

	// async to avoid return Promise.resolve
	public getLogs(): Promise<DebugLog[]> {
		return Promise.resolve(logsJson.result);
	}

	public getLog(logId: string): Promise<string> {
		return Promise.resolve('log content');
	}
}