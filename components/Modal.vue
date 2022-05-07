<template>
	<teleport to="body" v-if="open">
		<div class="vx-app vx-modal vx-fixed" :class="_theme" @click="close">
			<div
			class="vx-elm-modal-inner vx-animation-fadein"
			:class="_classes"
			:style="_style">
				<button
				v-if="$attrs.onClose !== undefined"
				class="vx-elm-modal-close"
				@click="close">
					<vx-icon times />
				</button>

				<div class="vx-elm-modal-body" @click.stop="">
					<slot></slot>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Modal",
	props: {
		theme: { type: String, required: false, default: "md primary" },
		open: { type: Boolean, required: false, default: true },
		width: { type: String, required: false, default: "500" },
		height: { type: String, required: false, default: "700" },
	},
})
export default class Modal extends VxVue {
	declare open?: boolean;

	declare width: string;

	declare height: string;

	declare $attrs: {
		onClose: () => void;
	};

	get _classes(): string[] {
		const list: string[] = [];
		return list;
	}

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		if (this.width) style.width = this.$vx.cssValueFromString(this.width);
		if (this.height) style.height = this.$vx.cssValueFromString(this.height);

		return style;
	}

	close(): void {
		if (this.$attrs.onClose !== undefined) this.$emit("close");
	}
}
</script>

<style scoped>
.vx-modal {
	z-index: 99;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #00000066;
}

.vx-elm-modal-inner {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

.vx-elm-modal-close {
	position: absolute;
	z-index: 2;
	width: 30px;
	height: 30px;
	top: -10px;
	right: -10px;
	color: var(--vx-theme-color2);
	background: none;
	border: none;
	cursor: pointer;
	background-color: var(--vx-theme-background2);
	border-radius: 100%;
	opacity: 1;
}
.vx-elm-modal-close:hover {
	opacity: 0.8;
}

.vx-elm-modal-body {
	width: 100%;
	height: 100%;
}

</style>
