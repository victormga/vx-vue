<template>
	<div
	class="vx-input-checkbox vx-hoverable"
	@click="on_input">

		<div
		class="vx-input-checkbox-outer"
		:class="{ 'vx-input-checkbox-active': !!value }">
			<vx-icon v-if="!value" square far />
			<vx-icon v-if="!!value" check-square far />
		</div>

		<div class="vx-placeholder vx-text-ellipsis">
			{{ placeholder }}
		</div>

	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";

@Options({
	name: "InputCheckbox",
	props: {
		value: { required: false },
		disabled: { type: Boolean, required: false, default: false },
		placeholder: { type: String, required: false },
	},
	emits: ["input"],
})
export default class InputCheckbox extends VxVue {
	declare value: any;

	declare disabled: boolean;

	declare placeholder: string;

	on_input(): void {
		if (this.disabled) return;
		this.$emit("input", !this.value);
	}

	focus(): void {
		//
	}
}
</script>

<style scoped>

.vx-input-checkbox-outer {
	position: relative;
	float: left;
	width: calc(var(--vx-size-baseline) / 1.85);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	font-size: calc(var(--vx-size-baseline) / 1.75);
	color: var(--vx-theme-color1);
	text-align: center;
}
.vx-input-checkbox-active {
	color: var(--vx-theme-success);
}

.vx-placeholder {
	width: calc(100% - (var(--vx-size-baseline) / 1.8));
	float: right;
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	padding-left: var(--vx-size-spacing);
	font-size: var(--vx-size-text2);
	color: var(--vx-theme-color2);
}
</style>
