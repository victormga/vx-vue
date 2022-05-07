<template>
	<div :class="[..._theme, ..._classes]" class="vx-drawer" :style="_style">
		<div v-if="open" class="vx-drawer-inner" :style="_inner_style">
			<button
			v-if="$attrs.onClose !== undefined"
			class="vx-drawer-close"
			@click="$emit('close')">
				<vx-icon times />
			</button>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Drawer",
	props: {
		theme: { type: String, required: false },
		width: { type: String, required: false, default: "300" },
		position: { type: String, required: false, default: "left" },
		elevated: { type: Boolean, required: false, default: true },
		open: { type: Boolean, required: true },
	},
})
export default class Drawer extends VxVue {
	declare width: string;

	declare position: string;

	declare elevated: string;

	declare open: boolean;

	declare $attrs: {
		onClose: () => void;
	};

	get _classes(): string[] {
		const list: string[] = [];
		if (this.elevated) list.push("vx-elevated");
		return list;
	}

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		if (this.position === "left") {
			style.left = "0";
			style["border-right"] = "1px solid var(--vx-theme-background1)";
		} else {
			style.right = "0";
			style["border-left"] = "1px solid var(--vx-theme-background1)";
		}

		style.width = (this.open) ? this.$vx.cssValueFromString(this.width) : "0";
		return style;
	}

	get _inner_style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};
		style.width = this.$vx.cssValueFromString(this.width);
		return style;
	}
}
</script>

<style scoped>
.vx-drawer {
	position: absolute;
	z-index: 11;
	max-width: var(--vx-vw);
	top: 0;
	height: 100%;
	transition: all .2s ease-in-out;
	overflow: hidden;
	background-color: var(--vx-theme-background2);
}
.vx-drawer-inner {
	position: relative;
	height: 100%;
}

.vx-drawer-close {
	position: absolute;
	z-index: 9;
	top: 0;
	right: 0;
	width: 50px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: var(--vx-theme-color2);
	font-size: 16px;
	background: none;
	padding: 0;
	border: none;
}

</style>
