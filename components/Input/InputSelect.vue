<template>
	<div class="vx-input-select" @click="open = !open">
		<div class="vx-input-select-placeholder vx-text-ellipsis">
			{{ _placeholder }}
		</div>
		<div class="vx-input-angle">
			<vx-icon v-if="open" angle-up />
			<vx-icon v-if="!open" angle-down />
		</div>
		<div class="vx-input-options vx-elevated" :class="{ 'active': open }">
			<div
			v-for="(option, key) in  _options"
			:key="key"
			class="vx-input-option vx-text-ellipsis"
			:class="{'vx-input-option-selected': value === key}"
			@click="on_input(key)"
			v-html="option"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";

@Options({
	name: "InputSelect",
	props: {
		value: { required: false },
		options: { type: Object, required: false },
		disabled: { type: Boolean, required: false, default: false },
		placeholder: { type: String, required: false },
	},
	emits: ["input"],
})
export default class InputSelect extends VxVue {
	declare $refs: {
		input: HTMLSelectElement,
	};

	declare value: any;

	declare options?: Record<string, undefined>;

	declare disabled: boolean;

	declare placeholder: string;

	get _options(): Record<string, unknown> {
		if (!this.options) return {};
		return this.options;
	}

	get _placeholder(): unknown {
		if (this.value) return this._options[this.value];
		return this.placeholder;
	}

	open: boolean = false;

	focus(): void {
		//
	}

	on_input(key: string): void {
		if (this.disabled) return;
		this.$emit("input", key);
	}
}
</script>

<style scoped>
.vx-input-select {
	position: relative;
	cursor: pointer;
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	padding-left: 2px;
}

.vx-input-select-placeholder {
	width: 100%;
	font-size: 14px;
	padding-right: calc(var(--vx-size-baseline) - var(--vx-size-spacing));
}

.vx-input-angle {
	position: absolute;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	text-align: center;
	right: 0;
	top: 0;
}

.vx-input-options {
	position: absolute;
	z-index: 15;
	top: var(--vx-size-baseline);
	left: 0;
	width: 100%;
	padding: 0 var(--vx-size-spacing);
	max-height: 0;
	overflow: hidden;
	transition: max-height .1s ease-in-out;
	background: var(--vx-theme-background4);
}
.vx-has-background  .vx-input-options {
	width: calc(100% + (var(--vx-size-spacing) * 2));
	left: calc(-1 * var(--vx-size-spacing));
}
.vx-has-icon .vx-input-options {
	width: calc(100% + var(--vx-size-baseline));
	left: calc(-1 * var(--vx-size-baseline));
}

.vx-input-options.active {
	max-height: 200px;
	overflow: auto;
}

.vx-input-option {
	color: var(--vx-theme-color0);
	font-size: var(--vx-size-text2);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
}
.vx-input-option.vx-input-option-selected {
	color: var(--vx-theme-color4);
	font-weight: bold;
}

.vx-input-option.vx-input-option-selected::before {
	content: "\f00c";
	font-family: "Font Awesome 5 Free";
	color: var(--vx-theme-success);
	margin-right: 5px;
}

.vx-input-option:hover {
	opacity: 0.8;
}
</style>
