<template>
	<div v-if="current !== null" class="vx-dialog vx-fixed" :class="_theme" @click="false">
		<div class="vx-dialog-inner" @click.prevent.stop="false">
			<div class="vx-dialog-wizzard-header vx-elevated">
				<vx-row style="column-gap: 0;">
					<vx-column v-for="(label, index) in list.length" :key="index">
						<div class="vx-wizzard-step vx-hoverable" @click="step = asInt(index)">
							<div class="vx-wizzard-step-label" :class="{ 'vx-wizzard-active': step >= index }">
								{{ label }}
							</div>
							<div class="vx-wizzard-step-bar-left" :class="{ 'vx-wizzard-active': step >= index }"></div>
							<div class="vx-wizzard-step-bar-right" :class="{ 'vx-wizzard-active': step > index }"></div>
						</div>
					</vx-column>
				</vx-row>
			</div>
			<dialog-alert v-if="current.type === 'alert'" :style="_style" :options="current.options" @done="next" @dismiss="previous" />
			<dialog-confirm v-if="current.type === 'confirm'" :style="_style" :options="current.options" @done="next" @dismiss="previous" />
			<dialog-choose v-if="current.type === 'choose'" :style="_style" :options="current.options" @done="next" @dismiss="previous" />
			<dialog-prompt v-if="current.type === 'prompt'" :style="_style" :options="current.options" @done="next" @dismiss="previous" />
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";
import { DialogElement, DialogOptions, DialogWizzardMethods } from "../../lib/VxLib";
import DialogAlert from "./DialogAlert.vue";
import DialogChoose from "./DialogChoose.vue";
import DialogConfirm from "./DialogConfirm.vue";
import DialogPrompt from "./DialogPrompt.vue";

@Options({
	name: "DialogWizzard",
	props: {
		theme: { type: String, required: false },
	},
	components: {
		"dialog-alert": DialogAlert,
		"dialog-confirm": DialogConfirm,
		"dialog-choose": DialogChoose,
		"dialog-prompt": DialogPrompt,
	},
})
export default class DialogWizzard extends VxVue {
	list: DialogElement[] = [];

	step: number = 0;

	results: any[] = [];

	resolve: (value: any[] | PromiseLike<any[]>) => void = () => { /**/ };

	get current(): DialogElement|null {
		if (!this.list.length) return null;
		return this.list[this.step];
	}

	get _style(): Record<string, unknown> {
		return {
			"margin-top": "calc(var(--vx-size-baseline) + (var(--vx-size-spacing) * 2))",
		};
	}

	reset(): void {
		this.list = [];
		this.step = 0;
		this.results = [];
	}

	dialogs(): DialogWizzardMethods {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;

		return {
			alert: function(options: DialogOptions) {
				self.list.push({
					type: "alert",
					options: options,
					callback: self.next,
				});
				return this;
			},
			confirm: function(options: DialogOptions) {
				self.list.push({
					type: "confirm",
					options: options,
					callback: self.next,
				});
				return this;
			},
			choose: function(options: DialogOptions) {
				self.list.push({
					type: "choose",
					options: options,
					callback: self.next,
				});
				return this;
			},
			prompt: function(options: DialogOptions) {
				self.list.push({
					type: "prompt",
					options: options,
					callback: self.next,
				});
				return this;
			},
			await: function() {
				return new Promise((resolve) => {
					self.resolve = resolve;
				});
			},
		};
	}

	previous(): void {
		if (this.step > 0) this.step -= 1;
	}

	next(value: any): void {
		if (!this.current) return;

		if (this.current.options.validate) {
			if (!this.current.options.validate(value)) return;
		}

		this.results[this.step] = value;
		this.step += 1;

		if (this.step === this.list.length) this.done();
	}

	done(): void {
		// eslint-disable-next-line no-restricted-syntax, guard-for-in
		for (const index in this.list) {
			const { validate } = this.list[index].options;
			if (!validate) continue;

			const value = this.results[index];
			if (!validate(value)) {
				this.step = parseInt(index, 10);
				return;
			}
		}

		this.resolve(this.results);
		this.reset();
	}

	asInt(str: string|number): number {
		if (typeof str === "number") return str;
		return parseInt(str, 10);
	}
}
</script>

<style scoped>
.vx-dialog {
	width: var(--vx-vw);
	height: var(--vx-vh);
	padding: var(--vx-size-spacing);
}

.vx-dialog-wizzard-header {
	position: absolute;
	width: 500px;
	height: calc(var(--vx-size-baseline) + (var(--vx-size-spacing) * 2));
	padding: var(--vx-size-spacing);
	max-width: 100%;
	left: 0;
	right: 0;
	margin: auto;
	background: var(--vx-theme-background1);
	color: var(--vx-theme-color4);
	font-size: var(--vx-size-text2);
}

.vx-wizzard-step {
	position: relative;
	width: 100%;
	height: var(--vx-size-baseline);
}

.vx-wizzard-step-label {
	position: relative;
	z-index: 2;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	border-radius: 100%;
	background: var(--vx-theme-background1);
	color: var(--vx-theme-color4);
	text-align: center;
	font-weight: bold;
	margin: 0 auto;
	font-size: var(--vx-size-text3);
}
.vx-wizzard-step-bar-left {
	position: absolute;
	width: 50%;
	height: 2px;
	background: var(--vx-theme-background1);
	top: calc(var(--vx-size-baseline) / 2);
	left: 0;
}
.vx-wizzard-step-bar-right {
	position: absolute;
	width: 50%;
	height: 2px;
	background: var(--vx-theme-background1);
	top: calc(var(--vx-size-baseline) / 2);
	right: 0;
}
.vx-wizzard-active {
	background: var(--vx-theme-color4);
	color: var(--vx-theme-background4);
}

</style>
