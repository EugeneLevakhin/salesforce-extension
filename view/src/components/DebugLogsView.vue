<template>
	<div class="logsview">
		<table>
			<tr>
				<th>Id</th>
				<th>StartTime</th>
				<th>Status</th>
				<th>User</th>
				<th>Operation</th>
				<th>Duration</th>
				<th>Length</th>
			</tr>
			<DebugLogView v-for="log in logs" :key="log.id" v-bind:log="log" v-on:log-clicked="onLogClicked" />
		</table>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { DebugLog } from '../../../src/models/debugLog';
import DebugLogView from './DebugLogView.vue';

@Component({
	components: {
		DebugLogView,
	},
})

export default class DebugLogsView extends Vue {
	@Prop() private logs!: DebugLog[];

	private onLogClicked(log: DebugLog): void {
		this.logClicked(log);
	}

	@Emit()
	logClicked(log: DebugLog): DebugLog {
		return log;
	}
}
</script>

<style>
table {
	border: 3px solid #646d72;
  	border-collapse: collapse;
  	width: 100%;
	color: black;
}

th {
	background-color: #1d4720;
}

th, td {
	border: 3px solid #646d72;
	height: 20px;
	text-align: left;
  	vertical-align: middle;
  	padding: 10px;
}

tr:nth-child(even) { background-color: #4e4564; }

tr:hover { background-color: #696c8b; }
</style>