import { CommandExecutor } from "./commandExecutor";

export class ApexTestRunner {
	constructor(private commandExecutor: CommandExecutor) { }

	public async runAllTests(): Promise<void> {
		try {
			await this.commandExecutor.execute('sfdx force:apex:test:run');
		} catch (error) {
			// TODO: Show error
		}
	}
}