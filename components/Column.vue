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
		flex: { type: String, required: false },
		width: { type: String, required: false },
	},
})
export default class Column extends VxVue {
	declare flex?: string;

	declare width?: string;

	get _style(): Record<string, unknown> {
		if (this.flex) return { flex: this.flex };
		if (this.width) return { "max-width": this.$vx.cssValueFromString(this.width) };
		return {};
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
