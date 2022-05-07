<template>
	<div class="vx-input-radio">
		<div class="vx-input-radio-options">

			<div class="vx-input-option" v-for="(option, key) in  _options" :key="key">
				<button
				class="vx-input-button vx-text-ellipsis"
				:class="{ 'vx-selected': (key === value) }"
				:title="`${option}`"
				:disabled="disabled"
				@click="on_input(key)"
				v-html="option"></button>
			</div>
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
.vx-input-radio {
	position: relative;
	width: 100%;
	height: var(--vx-size-baseline);
}

.vx-input-radio-options {
	display: flex;
}

.vx-input-option {
	display: flex;
	flex: 1;
	height: var(--vx-size-baseline);
}

.vx-input-button {
	width: 100%;
	height: calc(var(--vx-size-baseline));
	padding-left: var(--vx-size-spacing);
	padding-right: var(--vx-size-spacing);
	background: var(--vx-theme-background2);
	color: var(--vx-theme-color4);
	font-size: var(--vx-size-text1);
	border: 1px solid var(--vx-theme-background4);
	text-align: center;
	border-right: none;
	font-weight: bold;
}
.vx-input-button:hover {
	opacity: 0.8;
}

.vx-input-option:first-child .vx-input-button {
	border-radius: 5px 0 0 5px;
}
.vx-input-option:last-child .vx-input-button {
	border-radius: 0 5px 5px 0;
	border-right: 1px solid var(--vx-theme-background4);
}

.vx-input-button.vx-selected {
	color: var(--vx-theme-success);
	box-shadow: inset 0px 0px 5px #222;
}

</style>
