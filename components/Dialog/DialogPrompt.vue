<template>
	<div class="vx-dialog-item vx-elevated">
		<div class="vx-dialog-item-top">
			<div v-if="!!options.icon" class="vx-dialog-icon">
				<div class="vx-dialog-icon-inner"><vx-icon :icon="options.icon" /></div>
			</div>
			<div v-if="!!options.title" class="vx-dialog-item-title vx-text-ellipsis" v-html="options.title"></div>
		</div>
		<div class="vx-dialog-item-bottom">
			<div v-if="!!options.content" class="vx-dialog-content" v-html="options.content"></div>
		</div>
		<div class="vx-dialog-input">
			<vx-input
			:background="options.input?.background"
			:material="options.input?.material"
			v-model="model"
			:type="options.input?.type"
			:pattern="options.input?.pattern"
			:options="options.input?.options"
			:label="options.input?.label"
			:placeholder="options.input?.placeholder"
			:icon="options.input?.icon"
			autofocus />
		</div>
		<div class="vx-dialog-options">
			<vx-row>
				<vx-column>
					<vx-button v-if="options.dismissable" class="vx-dialog-cancel" @click="cancel">
						<vx-icon :icon="options.cancelButton?.icon ?? 'times'" />
						{{ options.cancelButton?.content ?? "CANCEL" }}
					</vx-button>
				</vx-column>
				<vx-column>
					<vx-button class="vx-dialog-ok" @click="done">
						<vx-icon :icon="options.okButton?.icon ?? 'check'" />
						{{ options.okButton?.content ?? "OK" }}
					</vx-button>
				</vx-column>
			</vx-row>
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../../lib/VxVue";
import { DialogOptions } from "../../lib/VxLib";

@Options({
	name: "DialogPrompt",
	props: {
		options: { type: Object, required: true },
	},
	emits: ["done", "dismiss"],
})
export default class DialogPrompt extends VxVue {
	declare options: DialogOptions;

	model: any = "";

	mounted(): void {
		this.model = this.options.input?.value;
	}

	cancel(): void {
		this.$emit("dismiss");
	}

	done(): void {
		this.$emit("done", this.model);
	}
}
</script>

<style scoped>
.vx-dialog-item {
	position: absolute;
	width: 500px;
	max-width: 100%;
	max-height: 100%;
	left: 0;
	right: 0;
	margin: auto;
	background: var(--vx-theme-background4);
	padding: var(--vx-size-spacing);

	color: var(--vx-theme-color4);
	font-size: var(--vx-size-text2);
}

.vx-dialog-item-top {
	float: left;
	width: 100%;
	height: var(--vx-size-baseline);
}

.vx-dialog-item-icon {
	float: left;
	width: calc(var(--vx-size-baseline) + var(--vx-size-spacing));
	height: var(--vx-size-baseline);
}

.vx-dialog-icon-inner {
	float: left;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	font-size: var(--vx-size-text4);
	text-align: center;
	background: var(--vx-theme-background1);
	border-radius: 100%;
}

.vx-dialog-item-title {
	float: right;
	width: calc(100% - (var(--vx-size-baseline) + var(--vx-size-spacing)));
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	font-size: var(--vx-size-text3);
	font-weight: bold;
}

.vx-dialog-item-bottom {
	float: left;
	width: 100%;
	padding: var(--vx-size-spacing) 0;
}

.vx-dialog-content {
	float: left;
	width: 100%;
	line-height: calc(var(--vx-size-baseline) / 2);
	font-size: var(--vx-size-text2);
}

.vx-dialog-input {
	float: left;
	width: 100%;
	padding-bottom: calc(var(--vx-size-baseline) * 0.75);
}

.vx-dialog-options {
	float: left;
	width: 100%;
}

.vx-dialog-cancel {
	color: var(--vx-theme-color1);
}

.vx-dialog-ok {
	color: var(--vx-theme-success);
}
</style>
