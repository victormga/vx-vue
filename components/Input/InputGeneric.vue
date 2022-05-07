<template>
	<input
	ref="input"
	class="vx-input-generic"
	:type="_type"
	:disabled="disabled"
	:placeholder="placeholder"
	v-model="model"
	@focus="on_focus"
	@blur="on_blur"
	@input="on_input"
	@keydown="on_keydown" />
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";

@Options({
	name: "InputGeneric",
	props: {
		value: { required: false },
		type: { type: String, required: false, default: "text" },
		pattern: { type: String, required: false },
		disabled: { type: Boolean, required: false, default: false },
		placeholder: { type: String, required: false },
	},
	emits: ["focus", "blur", "input", "done"],
	watch: {
		value: function() {
			this.model = this.value;
		},
	},
})
export default class InputGeneric extends VxVue {
	declare $refs: {
		input: HTMLInputElement,
	};

	declare value: any;

	declare classes: string[];

	declare type: string;

	declare pattern: string;

	declare disabled: boolean;

	declare placeholder: string;

	get _type(): string {
		if (this.type === "date") return (this.model || this.focused) ? "date" : "text";
		if (this.type === "time") return (this.model || this.focused) ? "time" : "text";
		return this.type;
	}

	get _pattern(): RegExp|null {
		if (this.pattern !== undefined) return new RegExp(this.pattern);
		if (this.type === "number") return new RegExp("[0-9]");
		return null;
	}

	focused: boolean = false;

	model: any = "";

	mounted(): void {
		this.model = this.value;
	}

	activated(): void {
		this.model = this.value;
	}

	focus(): void {
		this.$refs.input.focus();
	}

	on_focus(): void {
		this.focused = true;
		this.$emit("focus");
	}

	on_blur(): void {
		this.focused = false;
		this.$emit("blur");
		this.$emit("done", this.model);
	}

	on_input(): void {
		this.$emit("input", this.model);
	}

	on_keydown(event: KeyboardEvent): void {
		if (event.ctrlKey || event.altKey) return;

		if (event.key === "Enter") {
			this.$emit("done", this.model);
			return;
		}

		if (["Backspace"].includes(event.key)) {
			return;
		}

		if (this._pattern !== null && !this._pattern.test(event.key)) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
}
</script>

<style scoped>
.vx-input-generic {
	width: 100%;
	padding: 0;
	padding-right: var(--vx-size-spacing);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	background: none;
	border: none;
	color: var(--vx-theme-color2);
	font-size: var(--vx-size-text2);
}
.vx-input-generic::placeholder {
	color: var(--vx-theme-color2);
	font-size: var(--vx-size-text1);
	font-weight: bold;
}

</style>
