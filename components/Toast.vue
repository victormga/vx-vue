<template>
	<div class="vx-toast vx-fixed" :style="_style">
		<div v-if="list.length > 0" class="vx-toast-inner">
			<toast-item
			v-for="item in list"
			:key="item.id"
			:theme="item.options.theme"
			:item="item"
			@click="clicked" />
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";
import { ToastElement, ToastOptions } from "../lib/VxLib";
import ToastItem from "./Toast/ToastItem.vue";

@Options({
	name: "Toast",
	props: {
		width: { type: String, required: false, default: "350" },
		position: { type: String, required: false, default: "bottom.right" },
	},
	components: {
		"toast-item": ToastItem,
	},
})
export default class Toast extends VxVue {
	declare width: string;

	declare position: string;

	list: ToastElement[] = [];

	get _is_top(): boolean {
		return this.position.split(".").includes("top");
	}

	mounted(): void {
		this.$vx.toast = (options: ToastOptions) => new Promise((resolve) => {
			const toast = {
				id: `${Math.random()}`,
				options: options,
				callback: resolve,
			};

			if (this._is_top) {
				this.list.push(toast);
			} else {
				this.list.unshift(toast);
			}
			setTimeout(() => { this.remove(toast); }, options.duration ?? 8000);
		});
	}

	clicked(toast: ToastElement): void {
		const idx = this.list.indexOf(toast);
		if (idx < 0) return;

		this.list[idx].callback(true);

		if (!this.list[idx].options.dismissable) return;
		this.list.splice(idx, 1);
	}

	remove(toast: ToastElement): void {
		const idx = this.list.indexOf(toast);
		if (idx < 0) return;
		this.list.splice(idx, 1);
	}

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		style.width = this.$vx.cssValueFromString(this.width);

		const pos = this.position.split(".");

		if (pos.includes("top")) style.top = 0;
		if (pos.includes("bottom")) style.bottom = 0;
		if (pos.includes("left")) style.left = 0;
		if (pos.includes("right")) style.right = 0;

		return style;
	}
}
</script>

<style scoped>
.vx-toast-inner {
	float: left;
	width: 100%;
	padding: calc(var(--vx-size-spacing) / 2) var(--vx-size-spacing);
}

</style>
