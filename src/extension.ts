import * as vscode from 'vscode';
import { CommandExecutor } from './services/commandExecutor';
import { DebugLogsService } from './services/debugLogsService';
import { DebugLogsServiceMock } from './mocks/debugLogsServiceMock';
import { IDebugLogsService } from './services/iDebugLogsService';
import { ApexTestRunner } from './services/apexTestRunner';
import { BaseCommand } from './commands/baseCommand';
import { ApexTestRunCommand } from './commands/apexTestRunCommand';
import { ShowDebugLogsCommand } from './commands/showDebugLogsCommand';

export function activate(context: vscode.ExtensionContext) {
	const extensionPath: string = context.extensionPath;
	const workingDirectory: string = vscode.workspace.workspaceFolders![0].uri.fsPath;

	const commandExecutor = new CommandExecutor(workingDirectory);
	const apexTestRunner = new ApexTestRunner(commandExecutor);
	// const debugLogsService: IDebugLogsService = new DebugLogsService(commandExecutor);
	const debugLogsService: IDebugLogsService = new DebugLogsServiceMock();

	const commands: BaseCommand[] = [
		new ApexTestRunCommand(apexTestRunner),
		new ShowDebugLogsCommand(debugLogsService, extensionPath)
	];

	registerCommands(context, commands);

	vscode.commands.executeCommand('setContext', 'SFEXT_active', true);
}

export function registerCommands(context: vscode.ExtensionContext, commands: BaseCommand[]) {
	for (const command of commands) {
		context.subscriptions.push(command.registerCommand());
	}
}

export function deactivate() {
}