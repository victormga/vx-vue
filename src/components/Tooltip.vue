<template>
	<span ref="container" @mouseover="mouseover" @mouseout="mouseout">
		<slot></slot>
	</span>
	<teleport to="body" v-if="show">
		<div ref="tip" class="vx-app vx-modal vx-fixed vx-tooltip" :class="_theme" :style="style">
			<slot name="tooltip-content"></slot>
		</div>
	</teleport>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Tooltip",
	props: {
		theme: { type: String, required: false },
	},
})
export default class Tooltip extends VxVue {
	declare $refs: {
		container: HTMLSpanElement,
		tip: HTMLDivElement,
	}

	show: boolean = false;

	style: { top: string, left: string } = { top: "0", left: "0" };

	debouncer: number|null = null;

	mouseover(e: MouseEvent): void {
		this.debouncer = setTimeout(() => {
			this.style.top = `${e.clientY}px`;
			this.style.left = `${e.clientX + 15}px`;
			this.show = true;
			this.debouncer = null;
		}, 200);
	}

	mouseout(): void {
		if (this.debouncer !== null) {
			clearTimeout(this.debouncer);
			this.debouncer = null;
		}
		
		this.show = false;
	}
}
</script>

<style scoped>
.vx-tooltip {
	z-index: 99;
}
</style>
