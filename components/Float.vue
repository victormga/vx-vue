<template>
	<div
	:class="_theme"
	class="vx-float"
	:style="_style">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Float",
	props: {
		theme: { type: String, required: false },
		width: { type: String, required: false },
		height: { type: String, required: false },
		top: { type: [Boolean, String], required: false },
		right: { type: [Boolean, String], required: false },
		bottom: { type: [Boolean, String], required: false },
		left: { type: [Boolean, String], required: false },
	},
})
export default class Float extends VxVue {
	declare width?: string;

	declare height?: string;

	declare top: boolean|string;

	declare right: boolean|string;

	declare bottom: boolean|string;

	declare left: boolean|string;

	get _top(): string {
		if (typeof this.top !== "boolean") return this.top;
		return (this.top) ? "0" : "";
	}

	get _right(): string {
		if (typeof this.right !== "boolean") return this.right;
		return (this.right) ? "0" : "";
	}

	get _bottom(): string {
		if (typeof this.bottom !== "boolean") return this.bottom;
		return (this.bottom) ? "0" : "";
	}

	get _left(): string {
		if (typeof this.left !== "boolean") return this.left;
		return (this.left) ? "0" : "";
	}

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		if (this.width) style.width = this.$vx.cssValueFromString(this.width);
		if (this.height) style.height = this.$vx.cssValueFromString(this.height);

		if (this._bottom === "") style.top = this.$vx.cssValueFromString(this._top);
		if (this._right === "") style.left = this.$vx.cssValueFromString(this._left);
		if (this._top === "") style.bottom = this.$vx.cssValueFromString(this._bottom);
		if (this._left === "") style.right = this.$vx.cssValueFromString(this._right);

		return style;
	}
}
</script>

<style scoped>
.vx-float {
	position: absolute;
	max-width: var(--vx-vw);
	display: block;
	margin: auto;
}
</style>
