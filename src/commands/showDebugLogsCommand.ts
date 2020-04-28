import * as vscode from 'vscode';
import * as path from 'path';
import { BaseCommand } from "./baseCommand";
import { IDebugLogsService } from "../services/iDebugLogsService";

export class ShowDebugLogsCommand extends BaseCommand {
	private disposableObjects: vscode.Disposable[];

	constructor(private debugLogsService: IDebugLogsService, private extensionPath: string) {
		super('sfext.showDebugLogs');

		this.disposableObjects = [];
	}

	public commandHandler: () => Promise<void> = async () => {
		const panel = vscode.window.createWebviewPanel(
			'webViewType',
			'Apex Debug Logs',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);

		const onDiskPath: vscode.Uri = vscode.Uri.file(path.join(this.extensionPath, 'presentation', 'dist'));
		const resourceUri: vscode.Uri = panel.webview.asWebviewUri(onDiskPath);
		panel.webview.html = getWebviewContent(resourceUri.toString());

		panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);

						panel.webview.postMessage({ command: 'refactor' });
						return;
				}
			},
			undefined,
			this.disposableObjects
		);
	}
}

function getWebviewContent(path: string) {
	return `<!DOCTYPE html>
	<html lang=en>
	
	<head>
		<meta charset=utf-8>
		<meta http-equiv=X-UA-Compatible content="IE=edge">
		<meta name=viewport content="width=device-width,initial-scale=1">
		<link rel=icon href=/favicon.ico>
		<title>presentation</title>
		<link href=${path}/css/app.css rel=preload as=style>
		<link href=${path}/js/app.js rel=preload as=script>
		<link href=${path}/js/chunk-vendors.js rel=preload as=script>
		<link href=${path}/css/app.css rel=stylesheet>
	</head>
	
	<body><noscript><strong>We're sorry but presentation doesn't work properly without JavaScript enabled. Please enable it
				to continue.</strong></noscript>
		<div id=app></div>
		<script src=${path}/js/chunk-vendors.js></script>
		<script src=${path}/js/app.js></script>
	</body>
	
	</html>`;
}