import { exec } from 'child_process';

export class CommandExecutor {
	constructor(private currentWorkingDirectory: string) { }

	public execute(command: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const options = { cwd: this.currentWorkingDirectory, maxBuffer: 1024 * 4096 };

			exec(command, options, (err, stdout, stderr) => {
				if (err) {
					reject(err);
				}

				resolve(stdout);
			});
		});
	}
}