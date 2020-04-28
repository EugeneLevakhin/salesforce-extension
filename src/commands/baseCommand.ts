import * as vscode from "vscode";

export abstract class BaseCommand {
	constructor(protected name: string) { }

	public registerCommand: () => vscode.Disposable = () => {
		return vscode.commands.registerCommand(this.name, this.commandHandler);
	}

	public abstract commandHandler: () => void;
}