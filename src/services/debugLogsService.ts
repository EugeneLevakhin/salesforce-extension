import { DebugLog, LogsResult } from "../models/debugLog";
import { CommandExecutor } from "./commandExecutor";
import { IDebugLogsService } from "./iDebugLogsService";

export class DebugLogsService implements IDebugLogsService {
	constructor(private commandExecutor: CommandExecutor) { }

	public async getLogs(): Promise<DebugLog[]> {
		const stringResult: string = await this.commandExecutor.execute('sfdx force:apex:log:list --json');
		const logsResult: LogsResult = JSON.parse(stringResult);

		return logsResult.result;
	}

	public async getLog(logId: string): Promise<string> {
		return await this.commandExecutor.execute(`sfdx force:apex:log:get --logid ${logId}`);
	}
}