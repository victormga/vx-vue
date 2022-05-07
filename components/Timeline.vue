<template>
	<vx-container auto>
		<div class="vx-timeline" v-for="(item, idx) in list" :key="idx">
			<div class="vx-timeline-icon">
				<vx-icon :icon="item.icon" />
			</div>
			<div class="vx-timeline-text" v-html="item.content"></div>
		</div>
	</vx-container>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

type TimelineItem = {
	icon: string,
	content: string,
}

@Options({
	name: "Timeline",
	props: {
		theme: { type: String, required: false },
		list: { type: Array, required: true },
	},
	emits: ["click"],
})
export default class Timeline extends VxVue {
	declare list: TimelineItem[];

	// this.$emit("click", e);
}
</script>

<style scoped>

.vx-timeline {
	position: relative;
	float: left;
	width: 100%;
	border-left: 2px solid var(--vx-theme-color2);
	padding: var(--vx-size-spacing);
	padding-left: calc(var(--vx-size-spacing) * 1.5);
}

.vx-timeline-icon {
	position: absolute;
	top: calc(var(--vx-size-spacing) * .4);
	left: calc(var(--vx-size-baseline) * -.5);
	width: calc(var(--vx-size-baseline) * .9);
	height: calc(var(--vx-size-baseline) * .9);
	line-height: calc(var(--vx-size-baseline) * .9);
	text-align: center;
	background: var(--vx-theme-background0);
	border-radius: 100%;
}
.vx-timeline-icon i {
	background: var(--vx-theme-color2);
	font-size: var(--vx-size-text1);
	background: none;
}

.vx-timeline-text {
	font-size: var(--vx-size-text2);
}

</style>
