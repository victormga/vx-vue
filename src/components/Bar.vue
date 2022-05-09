<template>
	<div class="vx-bar">
		<div v-if="_inverted"  class="vx-full">
			<div class="vx-bar-inner" :style="_default_style">
				<slot></slot>
			</div>
			<div class="vx-bar-inner" :style="_bar_style">
				<slot name="bar-content"></slot>
			</div>
		</div>
		<div v-else class="vx-full">
			<div class="vx-bar-inner" :style="_bar_style">
				<slot name="bar-content"></slot>
			</div>
			<div class="vx-bar-inner" :style="_default_style">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Bar",
	props: {
		theme: { type: String, required: false },
		size: { type: String, required: false, default: "50" },
		position: { type: String, required: false, default: "top" },
	},
})
export default class Split extends VxVue {
	declare width: string;

	declare size: string;

	declare position: string;

	get _inverted(): boolean {
		return this.position === "bottom";
	}

	get _bar_style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};
		style.height = this.$vx.cssValueFromString(this.size);
		return style;
	}

	get _default_style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};
		style.height = `calc(100% - ${this.$vx.cssValueFromString(this.size)})`;
		return style;
	}
}
</script>

<style scoped>
.vx-bar {
	position: relative;
	width: 100%;
	height: 100%;
}

.vx-bar-inner {
	position: relative;
	width: 100%;
	height: 100%;
	float: left;
}

</style>
