<template>
	<tr>
		<td>
			<button class="as-link-button" v-on:click="logClicked">{{log.Id}}</button>
		</td>
		<td>{{ log.StartTime }}</td>
		<td>{{ log.Status }}</td>
		<td>{{ log.LogUser.Name }}</td>
		<td>{{ log.Operation }}</td>
		<td>{{ durationInSeconds }}</td>
		<td>{{ logLenghtInMb }}</td>
  	</tr>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { DebugLog } from '../../../src/models/debugLog';

@Component
export default class DebugLogView extends Vue {
	@Prop() private log!: DebugLog;

	get durationInSeconds(): number {
		return this.log.DurationMilliseconds / 1000;
	}

	get logLenghtInMb(): number {
		return this.log.LogLength / 1048576;
	}

	@Emit()
	logClicked(event: any): DebugLog {
		return this.log;
	}
}
</script>

<style scoped>
.as-link-button {
	background: transparent;
  	border: none;
  	color: #069;
  	text-decoration: underline;
  	cursor: pointer;
}

/* disable button focused border */
.as-link-button:focus { 
	outline:0; 
}
</style>