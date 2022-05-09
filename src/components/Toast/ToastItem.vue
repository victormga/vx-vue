<template>
	<button
		class="vx-toast-element vx-elevated"
		:class="_theme"
		@click="$emit('click', item)">
			<div class="vx-toast-left">
				<div class="vx-toast-icon">
					<vx-icon :icon="item.options.icon" />
				</div>
				<div class="vx-toast-image">

				</div>
			</div>
			<div class="vx-toast-right">
				<div class="vx-toast-title">
					{{ item.options.title }}
				</div>
				<div class="vx-toast-content">
					{{ item.options.content }}
				</div>
			</div>
		</button>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";
import { ToastElement } from "../../lib/VxLib";

@Options({
	name: "ToastItem",
	props: {
		theme: { type: String, required: false },
		item: { type: Object, required: true },
	},
	emits: ["click"],
})
export default class ToastItem extends VxVue {
	declare item: ToastElement;
}
</script>

<style scoped>

.vx-toast-element {
	float: left;
	width: 100%;
	margin-top: calc(var(--vx-size-spacing) / 2);
	margin-bottom: calc(var(--vx-size-spacing) / 2);
	background: var(--vx-theme-background2);
	padding: var(--vx-size-spacing);
	border: none;
	text-align: left;
}

.vx-toast-left {
	float: left;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
}

.vx-toast-right {
	float: right;
	width: calc(100% - var(--vx-size-baseline));
	height: auto;
}

.vx-toast-icon {
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	color: var(--vx-theme-color4);
	text-align: center;
	font-size: calc(var(--vx-size-baseline) * .8);
}

.vx-toast-image {
	width: 100%;
	height: 100%;
}

.vx-toast-title {
	color: var(--vx-theme-color4);
	font-size: var(--vx-size-text3);
	padding-left: var(--vx-size-spacing);
	height: calc(var(--vx-size-baseline) * 0.5);
	line-height: calc(var(--vx-size-baseline) * 0.5);
}

.vx-toast-content {
	color: var(--vx-theme-color2);
	font-size: var(--vx-size-text2);
	padding-left: var(--vx-size-spacing);
	line-height: calc(var(--vx-size-baseline) * 0.5);
}

</style>
