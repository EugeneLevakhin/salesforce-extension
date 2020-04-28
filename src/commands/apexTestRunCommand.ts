import { BaseCommand } from "./baseCommand";
import { ApexTestRunner } from "../services/apexTestRunner";

export class ApexTestRunCommand extends BaseCommand {
	constructor(private apexTestRunner: ApexTestRunner) {
		super('sfext.runAllApexTests');
	}

	public commandHandler: () => Promise<void> = async () => {
		await this.apexTestRunner.runAllTests();
	}
}