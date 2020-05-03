import * as vscode from 'vscode';
import * as path from 'path';
import { DebugLog } from '../models/debugLog';

export class DebugLogsView {
	private panel: vscode.WebviewPanel | undefined;
	private disposableObjects: vscode.Disposable[];

	constructor(private extensionPath: string) {
		this.disposableObjects = [];

		this.panel = vscode.window.createWebviewPanel(
			'webViewType',
			'Apex Debug Logs',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);

		const physicalPath: vscode.Uri = vscode.Uri.file(path.join(this.extensionPath, 'view', 'dist'));
		const resourceUri: vscode.Uri = this.panel.webview.asWebviewUri(physicalPath);
		this.panel.webview.html = this.getWebviewContent(resourceUri.toString());

		this.panel.webview.onDidReceiveMessage(this.messageListenerFromView, undefined, this.disposableObjects);
	}

	private messageListenerFromView = (log: DebugLog): void => {
		vscode.window.showErrorMessage(log.Id);
	}

	public sendMessageToView(debugLogs: DebugLog[]) {
		if (this.panel) {
			this.panel.webview.postMessage(debugLogs);
		}
	}

	private getWebviewContent(path: string) {
		return `<!DOCTYPE html>
		<html lang=en>
		
		<head>
			<meta charset=utf-8>
			<meta http-equiv=X-UA-Compatible content="IE=edge">
			<meta name=viewport content="width=device-width,initial-scale=1">
			<link rel=icon href=/favicon.ico>
			<title>view</title>
			<link href=${path}/css/app.css rel=preload as=style>
			<link href=${path}/js/app.js rel=preload as=script>
			<link href=${path}/js/chunk-vendors.js rel=preload as=script>
			<link href=${path}/css/app.css rel=stylesheet>
		</head>
		
		<body><noscript><strong>We're sorry but view doesn't work properly without JavaScript enabled. Please enable it
					to continue.</strong></noscript>
			<div id=app></div>
			<script src=${path}/js/chunk-vendors.js></script>
			<script src=${path}/js/app.js></script>
		</body>
		
		</html>`;
	}
}