<template>
	<textarea
	ref="input"
	class="vx-input-textarea"
	:type="_type"
	:disabled="disabled"
	:placeholder="placeholder"
	v-model="model"
	@focus="on_focus"
	@blur="on_blur"
	@input="on_input"></textarea>
	<div class="vx-input-textarea-arrow">
		<vx-icon text-height />
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";

@Options({
	name: "InputTextarea",
	props: {
		value: { required: false },
		type: { type: String, required: false, default: "text" },
		disabled: { type: Boolean, required: false, default: false },
		placeholder: { type: String, required: false },
	},
	emits: ["resize", "focus", "blur", "input", "done"],
})
export default class InputTextarea extends VxVue {
	declare $refs: {
		input: HTMLInputElement,
	};

	declare value: any;

	declare classes: string[];

	declare type: string;

	declare disabled: boolean;

	declare placeholder: string;

	get _type(): string {
		if (this.type === "date") return (this.model || this.focused) ? "date" : "text";
		if (this.type === "time") return (this.model || this.focused) ? "time" : "text";
		return this.type;
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
		this.$emit("resize", "calc(var(--vx-size-baseline) * 4)");
	}

	on_blur(): void {
		this.focused = false;
		this.$emit("blur");
		this.$emit("resize", "var(--vx-size-baseline)");
		this.$refs.input.scrollTop = 0;

		this.$emit("done", this.model);
	}

	on_input(): void {
		this.$emit("input", this.model);
	}
}
</script>

<style scoped>
.vx-input-textarea {
	position: absolute;
	width: 100%;
	padding: 0;
	padding-right: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	background: none;
	border: none;
	color: var(--vx-theme-color2);
	resize: none;
	overflow: hidden;
	transition: all 0.2s ease-in-out;
	font-family: inherit;
	font-size: var(--vx-size-text2);
}

.vx-input-textarea:focus {
	height: calc(var(--vx-size-baseline) * 4);
	line-height: calc(var(--vx-size-baseline) * 0.5);
	padding-top: calc(var(--vx-size-baseline) * 0.25);
	padding-bottom: calc(var(--vx-size-baseline) * 0.25);
	overflow: auto;
}

.vx-input-textarea-arrow {
	position: absolute;
	width: var(--vx-size-baseline);
	height:var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	top: 0;
	right: 0;
	text-align: center;
	opacity: 0.2;
}

</style>
