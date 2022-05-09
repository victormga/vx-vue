<template>
	<div class="vx-container" :class="_theme" :style="_style">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Container",
	props: {
		theme: { type: String, required: false },
		width: { type: String, required: false },
		height: { type: String, required: false },
		auto: { type: Boolean, required: false },
	},
})
export default class Container extends VxVue {
	declare width?: string;

	declare height?: string;

	declare auto?: boolean;

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};
		if (this.width) style.width = this.$vx.cssValueFromString(this.width);
		if (this.height) style.height = this.$vx.cssValueFromString(this.height);
		if (this.auto) style.height = "auto";
		return style;
	}
}
</script>

<style scoped>
.vx-container {
	position: relative;
	float: left;
	width: 100%;
	height: 100%;
	color: var(--vx-theme-color2);
	font-size: var(--vx-size-text2);
}
</style>
