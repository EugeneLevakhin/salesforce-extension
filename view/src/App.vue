<template>
	<div id="app">
		<!-- <button @click="showModal = true">Show modal</button> -->
		<!-- <button v-on:click="onShowLoading">Show loading</button> -->
		<ModalDialog v-if="showModal" @close="showModal = false">
			<h3 slot="header">custom header</h3>
		</ModalDialog>

		<LoadingDialog v-if="showLoading" />

		<DebugLogsView v-bind:logs="logs" v-on:log-clicked="onLogClicked" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DebugLogsView from './components/DebugLogsView.vue';
import ModalDialog from './components/ModalDialog.vue';
import LoadingDialog from './components/LoadingDialog.vue';
import { DebugLog } from '../../src/models/debugLog';
import MockDebugLogs from '../../src/mocks/logs.json';
import { getEnvironment, Environment } from './utils';

@Component({
	components: {
		DebugLogsView,
		ModalDialog,
		LoadingDialog
	},
})

export default class App extends Vue {
	private vscode: any;
	private receivedLogs: DebugLog[] = [];
	private ennvironment: Environment;
	private showModal: boolean = false;
	private showLoading: boolean = false;

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

	private onShowLoading(): void {
		this.showLoading = true;

		setTimeout(() => {
			this.showLoading = false;
		}, 2000);
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