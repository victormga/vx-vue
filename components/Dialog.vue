<template>
	<dialog-wizzard ref="wizzard" :theme="theme" />
	<div v-if="current !== null" class="vx-dialog vx-fixed" :class="_theme" @click="dismiss">
		<div class="vx-dialog-inner" @click.prevent.stop="false">
			<dialog-alert v-if="current.type === 'alert'" :options="current.options" @done="next" @dismiss="dismiss" />
			<dialog-confirm v-if="current.type === 'confirm'" :options="current.options" @done="next" @dismiss="dismiss" />
			<dialog-choose v-if="current.type === 'choose'" :options="current.options" @done="next" @dismiss="dismiss" />
			<dialog-prompt v-if="current.type === 'prompt'" :options="current.options" @done="next" @dismiss="dismiss" />
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";
import { DialogElement, DialogOptions } from "../lib/VxLib";
import DialogAlert from "./Dialog/DialogAlert.vue";
import DialogChoose from "./Dialog/DialogChoose.vue";
import DialogConfirm from "./Dialog/DialogConfirm.vue";
import DialogPrompt from "./Dialog/DialogPrompt.vue";
import DialogWizzard from "./Dialog/DialogWizzard.vue";

@Options({
	name: "Dialog",
	props: {
		theme: { type: String, required: false },
	},
	components: {
		"dialog-wizzard": DialogWizzard,
		"dialog-alert": DialogAlert,
		"dialog-confirm": DialogConfirm,
		"dialog-choose": DialogChoose,
		"dialog-prompt": DialogPrompt,
	},
})
export default class Dialog extends VxVue {
	declare $refs: {
		wizzard: typeof DialogWizzard
	};

	list: DialogElement[] = [];

	get current(): DialogElement|null {
		if (!this.list.length) return null;
		return this.list[0];
	}

	mounted(): void {
		this.$vx.dialog = {
			alert: (options: DialogOptions) => new Promise((resolve) => {
				this.list.push({
					type: "alert",
					options: options,
					callback: resolve,
				});
			}),
			confirm: (options: DialogOptions) => new Promise((resolve) => {
				this.list.push({
					type: "confirm",
					options: options,
					callback: resolve,
				});
			}),
			choose: (options: DialogOptions) => new Promise((resolve) => {
				this.list.push({
					type: "choose",
					options: options,
					callback: resolve,
				});
			}),
			prompt: (options: DialogOptions) => new Promise((resolve) => {
				this.list.push({
					type: "prompt",
					options: options,
					callback: resolve,
				});
			}),
			// @ts-ignore
			wizzard: () => this.$refs.wizzard.dialogs(),
		};
	}

	dismiss(): void {
		if (!this.current) return;
		if (!this.current.options.dismissable) return;
		this.next(null);
	}

	next(value: any): void {
		if (!this.current) return;
		if (this.current.options.validate && !this.current.options.validate(value)) return;
		this.current.callback(value);
		this.list.shift();
	}
}
</script>

<style scoped>
.vx-dialog {
	width: var(--vx-vw);
	height: var(--vx-vh);
	padding: var(--vx-size-spacing);
}
</style>
