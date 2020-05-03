import { BaseCommand } from "./baseCommand";
import { IDebugLogsService } from "../services/iDebugLogsService";
import { DebugLogsView } from "../view/debugLogsView";
import { DebugLog } from "../models/debugLog";

export class ShowDebugLogsCommand extends BaseCommand {
	constructor(private debugLogsService: IDebugLogsService, private extensionPath: string) {
		super('sfext.showDebugLogs');
	}

	public commandHandler: () => Promise<void> = async () => {
		const logs: DebugLog[] = await this.debugLogsService.getLogs();
		const debugLogsView: DebugLogsView = new DebugLogsView(this.extensionPath);
		
		debugLogsView.sendMessageToView(logs);
	}
}