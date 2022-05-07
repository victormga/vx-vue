<template>
	<button
	:class="[..._theme, ..._classes]"
	class="vx-button"
	:disabled="_disabled"
	@click="on_click">
		<div v-if="_iconLeft" class="vx-button-icon vx-button-icon-left">
			<vx-icon :icon="_iconLeft" />
		</div>
		<slot></slot>
		<div v-if="_iconRight" class="vx-button-icon vx-button-icon-right">
			<vx-icon :icon="_iconRight" />
		</div>
	</button>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Button",
	props: {
		theme: { type: String, required: false },
		icon: { type: String, required: false },
		iconLeft: { type: String, required: false },
		iconRight: { type: String, required: false },
		height: { type: String, required: false },
		disabled: { type: Boolean, required: false, default: false },
		loading: { type: Boolean, required: false },
	},
	emits: ["click"],
})
export default class Button extends VxVue {
	declare icon?: string;

	declare iconLeft?: string;

	declare iconRight?: string;

	declare height?: string;

	declare disabled: boolean;

	declare loading?: boolean;

	declare $attrs: {
		onClickAsync: () => Promise<any>;
	}

	get _disabled(): boolean {
		return this.disabled || this.loading || this.internal_loading;
	}

	get _iconLeft(): string|undefined {
		return this.iconLeft ?? this.icon;
	}

	get _iconRight(): string {
		if (this.loading || this.internal_loading) return "circle-notch spin";
		return this.iconRight ?? "";
	}

	get _classes(): string[] {
		const list: string[] = [];
		if (this._disabled) list.push("vx-disabled");
		if (this._iconLeft || this._iconRight) list.push("vx-has-icon");
		return list;
	}

	internal_loading: boolean = false;

	async on_click(e: MouseEvent): Promise<void> {
		if (!this.$attrs.onClickAsync) {
			this.$emit("click", e);
		} else {
			this.internal_loading = true;
			await this.$attrs.onClickAsync();
			this.internal_loading = false;
		}
	}
}
</script>

<style scoped>

.vx-button {
	position: relative;
	border: none;
	width: 100%;
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	background: var(--vx-theme-background0);
	color: var(--vx-theme-color0);
	font-weight: bold;
	font-size: var(--vx-size-text1);
}

.vx-button.vx-has-icon {
	padding-left: var(--vx-size-baseline);
	padding-right: var(--vx-size-baseline);
}

.vx-button-icon {
	position: absolute;
	top: 0;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	color: var(--vx-theme-color4);
	text-align: center;
}

.vx-button-icon-left {
	left: 0;
}
.vx-button-icon-right {
	right: 0;
}
</style>
