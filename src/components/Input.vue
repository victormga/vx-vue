<template>
	<div class="vx-input" :class="[..._theme, ..._classes]" :style="{ 'height': height }">
		<div v-if="!!label" class="vx-input-label vx-text-ellipsis">
			{{ label }}
		</div>

		<div class="vx-input-inner">
			<input-checkbox
			v-if="type === 'checkbox'"
			ref="input"
			:value="_model"
			:disabled="_disabled"
			:placeholder="placeholder"
			:debounce="debounce"
			@input="on_input" />

			<input-toggle
			v-else-if="type === 'toggle'"
			ref="input"
			:value="_model"
			:disabled="_disabled"
			:placeholder="placeholder"
			@input="on_input" />

			<input-select
			v-else-if="type === 'select'"
			ref="input"
			:value="_model"
			:options="options"
			:disabled="_disabled"
			:placeholder="placeholder"
			@input="on_input">
				<slot></slot>
			</input-select>

			<input-radio
			v-else-if="type === 'radio'"
			ref="input"
			:value="_model"
			:options="options"
			:disabled="_disabled"
			@input="on_input">
				<slot></slot>
			</input-radio>

			<input-textarea
			v-else-if="type === 'textarea'"
			ref="input"
			:value="_model"
			:type="type"
			:disabled="_disabled"
			:placeholder="(!label) ? placeholder : ''"
			@resize="set_height"
			@focus="focused = true"
			@blur="focused = false"
			@input="on_input"
			@done="done" />

			<input-generic
			v-else
			ref="input"
			:value="_model"
			:type="type"
			:pattern="pattern"
			:disabled="_disabled"
			:placeholder="(!label) ? placeholder : ''"
			@focus="focused = true"
			@blur="focused = false"
			@input="on_input"
			@done="done" />
		</div>

		<div v-if="!!icon" class="vx-input-icon">
			<vx-icon :icon="icon" />
		</div>
		<div v-if="!!loading" class="vx-input-loading">
			<vx-icon icon="circle-notch spin" />
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";
import InputCheckbox from "./Input/InputCheckbox.vue";
import InputGeneric from "./Input/InputGeneric.vue";
import InputRadio from "./Input/InputRadio.vue";
import InputSelect from "./Input/InputSelect.vue";
import InputTextarea from "./Input/InputTextarea.vue";
import InputToggle from "./Input/InputToggle.vue";

@Options({
	name: "Input",
	props: {
		theme: { type: String, required: false },
		background: { type: Boolean, required: false },
		material: { type: Boolean, required: false },
		inline: { type: Boolean, required: false },
		debounce: { type: [Boolean, String], required: false },

		modelValue: { required: false },
		type: { type: String, required: false, default: "text" },
		pattern: { type: String, required: false },
		options: { type: Object, required: false },
		disabled: { type: Boolean, required: false },
		label: { type: String, required: false },
		placeholder: { type: String, required: false },
		icon: { type: String, required: false },
		autofocus: { type: Boolean, required: false },
		loading: { type: Boolean, required: false },
	},
	emits: ["update:modelValue", "change"],
	components: {
		"input-generic": InputGeneric,
		"input-checkbox": InputCheckbox,
		"input-toggle": InputToggle,
		"input-select": InputSelect,
		"input-radio": InputRadio,
		"input-textarea": InputTextarea,
	},
})
export default class Input extends VxVue {
	declare $refs: {
		input: (typeof InputGeneric)|(typeof InputCheckbox)
	};

	declare background?: boolean;

	declare material?: boolean;

	declare inline?: boolean;

	declare debounce?: boolean|string;

	declare modelValue: any;

	declare type: string;

	declare pattern?: string;

	declare options?: Record<string, unknown>;

	declare disabled?: boolean;

	declare label?: string;

	declare placeholder?: string;

	declare icon?: string;

	declare autofocus?: boolean;

	declare loading?: boolean;

	get _model(): any {
		if (this.modelValue !== undefined) return this.modelValue;
		return this.internal_model;
	}

	get _disabled(): boolean {
		return !!this.disabled || !!this.loading;
	}

	get _classes(): string[] {
		const list: string[] = [];

		if (this.icon) list.push("vx-has-icon");
		if (this.background) list.push("vx-has-background");
		if (this.material) list.push("vx-input-material");
		if (this.inline) list.push("vx-input-inline");
		if (this.loading) list.push("vx-has-loading");
		if (this._disabled) list.push("vx-disabled");

		const labeled_types = ["toggle", "checkbox", "select", "radio"];
		if (this.focused || !!this.modelValue || !!this.internal_model || labeled_types.includes(this.type)) {
			list.push("vx-has-focus");
		}

		return list;
	}

	internal_model: any = "";

	focused: boolean = false;

	height: string = "var(--vx-size-baseline)";

	debounce_interval: any = null;

	mounted(): void {
		if (this.autofocus) {
			this.$nextTick(() => {
				this.focus();
			});
		}
	}

	focus(): void {
		// @ts-ignore
		this.$refs.input.focus();
	}

	on_input(value: any): void {
		this.internal_model = value;

		if (this.debounce) {
			if (this.debounce_interval !== null) clearTimeout(this.debounce_interval);
			let ms = 400;
			if (typeof this.debounce === "string") ms = parseInt(this.debounce, 10);
			this.debounce_interval = setTimeout(() => { this.done(value); }, ms);
		} else {
			this.done(value);
		}
	}

	done(value: any): void {
		if (this.debounce_interval !== null) clearTimeout(this.debounce_interval);
		this.$emit("update:modelValue", value);
		this.$nextTick(() => {
			this.$emit("change", value);
		});
	}

	set_height(height: string): void {
		this.height = height;
	}
}
</script>

<style scoped>

.vx-input {
	position: relative;
	float: left;
	width: 100%;
	color: var(--vx-theme-color0);
	margin-top: calc(var(--vx-size-baseline) * 0.75);
	transition: height .2s ease-in-out;
}
.vx-input.vx-input-inline {
	margin-top: 0;
}
.vx-input.vx-input-material {
	border-bottom: 1px solid var(--vx-theme-background4);
}

.vx-input.vx-has-background {
	background: var(--vx-theme-background0);
	padding-left: var(--vx-size-spacing);
	padding-right: var(--vx-size-spacing);
}

.vx-input.vx-has-icon {
	padding-left: var(--vx-size-baseline);
}
.vx-input.vx-has-loading {
	padding-right: var(--vx-size-baseline);
}

.vx-input-label {
	position: absolute;
	top: 0;
	left: 5px;
	right: 5px;
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	font-size: var(--vx-size-text2);
	color: var(--vx-theme-color2);
	opacity: 0.8;
	transition: all .2s ease-in-out;
}
.vx-has-background .vx-input-label {
	left: var(--vx-size-spacing);
	right: var(--vx-size-spacing);
}
.vx-has-icon .vx-input-label {
	left: var(--vx-size-baseline);
}
.vx-has-loading .vx-input-label {
	right: var(--vx-size-baseline);
}
.vx-has-focus .vx-input-label {
	left: 0;
	top: calc(var(--vx-size-baseline) * -0.8);
	font-size: var(--vx-size-text1);
	opacity: 1;
}

.vx-input-icon {
	position: absolute;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	text-align: center;
	top: 0;
	left: 0;
	color: var(--vx-theme-color2);
}
.vx-input-inner {
	position: relative;
	width: 100%;
	height: var(--vx-size-baseline);
}
.vx-input-loading {
	position: absolute;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	text-align: center;
	top: 0;
	right: 0;
}
</style>
