<template>
	<div class="vx-row" :classes="_theme" :style="_style">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Row",
	props: {
		theme: { type: String, required: false },
		gap: { type: String, required: false },
		height: { type: String, required: false },
	},
})
export default class Row extends VxVue {
	declare gap: string;

	declare height: string;

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};
		if (this.gap !== undefined) style["column-gap"] = this.$vx.cssValueFromString(this.gap);
		if (this.height) style.height = this.$vx.cssValueFromString(this.height);
		return style;
	}
}
</script>

<style scoped>

.vx-row {
	display: flex;
	height: auto;
	column-gap: var(--vx-size-spacing);
	flex-wrap: wrap;
}

</style>
