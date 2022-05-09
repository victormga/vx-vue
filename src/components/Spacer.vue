<template>
	<div class="vx-elm-spacer" :style="_style">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Spacer",
	props: {
		theme: { type: String, required: false },
		size: { type: String, required: true },
		color: { type: [Boolean, String], required: false, default: false },
	},
})
export default class Spacer extends VxVue {
	declare size: string;

	declare color: boolean|string;

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		style.height = `${parseFloat(this.size) / 2}px`;
		style["margin-bottom"] = `${parseFloat(this.size) / 2}px`;

		if (this.color) {
			if (typeof this.color === "boolean") {
				style["border-bottom"] = "1px solid var(--vx-theme-background1)";
			} else {
				const color = parseInt(this.color, 10);
				style["border-bottom"] = `1px solid var(--vx-theme-background${color})`;
			}
		}

		return style;
	}
}
</script>

<style scoped>
.vx-elm-spacer {
	float: left;
	width: 100%;
}

.vx-with-border {
	border-bottom: 1px solid transparent;
}
</style>
