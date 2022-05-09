<template>
	<div class="vx-text" :class="[..._theme]" :style="_style">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Text",
	props: {
		theme: { type: String, required: false },
		size: { type: String, required: false },
		color: { type: String, required: false },
		height: { type: String, required: false },
	},
})
export default class Text extends VxVue {
	declare size?: string;

	declare color?: string;

	declare height?: string;

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		if (this.size) {
			style["font-size"] = `var(--vx-size-text${this.size})`;
		} else {
			style["font-size"] = "var(--vx-size-text2)";
		}

		if (this.color) style.color = `var(--vx-theme-color${this.color})`;

		if (this.height) {
			style.height = this.$vx.cssValueFromString(this.height);
			style["line-height"] = this.$vx.cssValueFromString(this.height);
		}

		return style;
	}
}
</script>

<style scoped>
.vx-text {
	width: 100%;
	display: block;
	color: var(--vx-theme-color2);
}
</style>
