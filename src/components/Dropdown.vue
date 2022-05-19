<template>
	<div ref="dropdown" class="vx-dropdown" :class="[..._theme, ..._classes]" @mouseup="on_click" >
		<div @mouseover="on_hover" @mouseout="on_blur">
			<slot name="button"></slot>
		</div>
		<div class="vx-dropdown-position" :style="_style_position">
			<div
			v-if="show"
			class="vx-dropdown-inner"
			:style="_style_anchor"
			@mouseover="on_hover"
			@mouseout="on_blur">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Dropdown",
	props: {
		theme: { type: String, required: false },
		hover: { type: Boolean, required: false },
		position: { type: String, required: false, default: "bottom right" },
		anchor: { type: String, required: false, default: "top right" },
		disabled: { type: Boolean, required: false },
	},
	watch: {
		disabled: function() {
			if (this.disabled) this.show = false;
		},
	},
})
export default class Dropdown extends VxVue {
	declare hover?: boolean;

	declare position: string;

	declare anchor: string;

	declare disabled: boolean;

	declare $refs: {
		dropdown: HTMLDivElement,
	};

	get _classes(): string[] {
		const list: string[] = [];
		return list;
	}

	get _style_position(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		const pos = this.position.split(" ");
		if (pos.includes("top")) style.top = 0;
		if (pos.includes("right")) style.right = 0;
		if (pos.includes("bottom")) style.bottom = 0;
		if (pos.includes("left")) style.left = 0;

		return style;
	}

	get _style_anchor(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		const anchor = this.anchor.split(" ");
		if (anchor.includes("top")) style.top = 0;
		if (anchor.includes("right")) style.right = 0;
		if (anchor.includes("bottom")) style.bottom = 0;
		if (anchor.includes("left")) style.left = 0;

		return style;
	}

	show: boolean = false;

	debounce: any = 0;

	click_outside: any = null;

	mounted(): void {
		this.click_outside = (e: InputEvent) => {
			if (this.$refs.dropdown.contains(e.target as Node)) return;
			this.show = false;
		};
		window.addEventListener("click", this.click_outside);
		window.addEventListener("keydown", this.bind_keys);
	}

	beforeUnmount(): void {
		window.removeEventListener("click", this.click_outside);
		window.removeEventListener("keydown", this.bind_keys);
	}

	on_click(): void {
		if (this.disabled) return;

		if (!this.show) {
			this.show = true;
		} else {
			setTimeout(() => { this.show = !this.show; });
		}
	}

	on_hover(): void {
		if (this.disabled) return;

		if (!this.hover) return;
		if (this.debounce) clearTimeout(this.debounce);
		this.show = true;
	}

	on_blur(): void {
		if (!this.hover) return;
		this.debounce = setTimeout(() => { this.show = false; }, 200);
	}

	bind_keys(event: KeyboardEvent): void {
		if (event.key === "Escape") this.show = false;
	}
}
</script>

<style scoped>
.vx-dropdown {
	position: relative;
	float: left;
	width: 100%;
}

.vx-dropdown-position {
	position: absolute;
	margin: auto;
	width: 0;
	height: 0;
	z-index: 12;
}

.vx-dropdown-inner {
	position: absolute;
	width: 100%;
	min-width: 200px;
}
</style>
