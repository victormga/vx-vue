<template>
	<div class="vx-input-notch" @click="on_input">
		<div class="vx-input-notch-outer">
			<div class="vx-input-notch-inner" :class="{ 'active': !!value }"></div>
		</div>
		<div class="vx-input-notch-placeholder vx-text-ellipsis">
			{{ placeholder }}
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";

@Options({
	name: "InputToggle",
	props: {
		value: { required: false },
		disabled: { type: Boolean, required: false, default: false },
		placeholder: { type: String, required: false },
	},
	emits: ["input"],
})
export default class InputToggle extends VxVue {
	declare value: any;

	declare disabled: boolean;

	declare placeholder: string;

	focus(): void {
		//
	}

	on_input(): void {
		if (this.disabled) return;
		this.$emit("input", !this.value);
	}
}
</script>

<style scoped>

.vx-input-notch {
	position: relative;
	float: left;
	width: 100%;
	height: var(--vx-size-baseline);
	cursor: pointer;
}
.vx-input-notch:hover {
	opacity: 0.8;
}

.vx-input-notch-outer {
	position: relative;
	float: left;
	width: var(--vx-size-baseline);
	height: calc(var(--vx-size-baseline) / 2);
	padding: 2px;
	margin-top: calc(var(--vx-size-baseline) / 4);
	background: var(--vx-theme-background1);
	border-radius: calc(var(--vx-size-baseline) / 2);
}

.vx-input-notch-inner {
	position: absolute;
	width: calc((var(--vx-size-baseline) / 2) - 4px);
	height: calc((var(--vx-size-baseline) / 2) - 4px);
	background: var(--vx-theme-color1);
	border-radius: 100%;
	left: 2px;
	transition: all .2s ease-in-out;
}
.vx-input-notch-inner.active {
	background: var(--vx-theme-success);
	left: calc((var(--vx-size-baseline) / 2) + 2px);
}

.vx-input-notch-placeholder {
	float: right;
	width: calc(100% - var(--vx-size-baseline));
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	padding-left: var(--vx-size-spacing);
	font-size: var(--vx-size-text2);
}

</style>
