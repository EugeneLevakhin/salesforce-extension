<template>
	<div id="app">
		<DebugLogsView v-bind:logs="logs" v-on:log-clicked="onLogClicked" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DebugLogsView from './components/DebugLogsView.vue';
import { DebugLog } from '../../src/models/debugLog';
import MockDebugLogs from '../../src/mocks/logs.json';
import { getEnvironment, Environment } from './utils';

@Component({
	components: {
		DebugLogsView,
	},
})

export default class App extends Vue {
	private vscode: any;
	private receivedLogs: DebugLog[] = [];
	private ennvironment: Environment;

	constructor() {
		super();

		this.ennvironment = getEnvironment();
	}

	get logs(): DebugLog[] {
		if (this.ennvironment === Environment.Production) {
			return this.receivedLogs;
		} else {
			return  MockDebugLogs.result;
		}
	}

	created() {
		if (this.ennvironment === Environment.Production) {
			// @ts-ignore
			window.addEventListener('message', this.messageListenerFromExtension);
			// @ts-ignore
			this.vscode = acquireVsCodeApi();
		}
	}

	destroyed() {
		if (this.ennvironment === Environment.Production) {
			// @ts-ignore
			window.removeEventListener('message', this.messageListenerFromExtension);
		}
	}

	private messageListenerFromExtension(event: any) {
		this.receivedLogs = event.data;
	}

	private onLogClicked(log: DebugLog): void {
		if (this.ennvironment === Environment.Production) {
			this.vscode.postMessage(log);
		} else if (this.ennvironment === Environment.Development) {
			console.log('log clicked', log.Id);
		}
	}
}

</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 8px;
}
</style>