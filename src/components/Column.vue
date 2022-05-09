<template>
	<div class="vx-column" :style="_style">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Column",
	props: {
		theme: { type: String, required: false },
		size: { type: String, required: false },
		width: { type: String, required: false },
		break: { type: String, required: false },
	},
})
export default class Column extends VxVue {
	declare size?: string;

	declare width?: string;

	declare break?: string;

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		if (this.size) style.flex = this.size;
		if (this.width) style["max-width"] = this.$vx.cssValueFromString(this.width);
		if (this.break) style["min-width"] = this.$vx.cssValueFromString(this.break);
		
		return style;
	}
}
</script>

<style scoped>
.vx-column {
	position: relative;
	display: flex;
	flex: 1;
	width: 100%;
	height: 100%;
}
</style>
