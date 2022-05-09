<template>
	<div
	ref="container"
	class="vx-image-wrapper"
	:class="[..._theme, ..._classes]"
	@mousemove="mousemove"
	@mouseup="toggle_zoom">
		<img v-if="!apply_zoom" class="vx-image-default" :src="_src" @error="has_error = true" />
		<div v-if="apply_zoom" class="vx-image-zoom-container" :style="_style"></div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Image",
	props: {
		theme: { type: String, required: false },
		src: { type: String, required: true },
		fallback: { type: String, required: false },
		zoom: { type: Boolean, required: false },
	},
})
export default class Image extends VxVue {
	declare src: string;

	declare fallback?: string;

	declare zoom?: boolean;

	declare $refs: {
		container: HTMLDivElement
	};

	get _src(): string {
		if (!this.has_error && this.src) return this.src;
		return this.fallback ?? "";
	}

	get _classes(): string[] {
		const list: string[] = [];
		if (this.zoom) list.push("vx-image-has-zoom");
		return list;
	}

	get _style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};

		style["background-image"] = `url('${this.src}')`;
		if (!this.apply_zoom) return style;

		style["background-size"] = "150%";
		let clampx = ((this.displacement.horizontal - 0.5) * 1.4) + 0.5;
		let clampy = ((this.displacement.vertical - 0.5) * 1.4) + 0.5;
		clampx = this.clamp(clampx * 100, 0, 100);
		clampy = this.clamp(clampy * 100, 0, 100);

		style["background-position"] = `${clampx}% ${clampy}%`;
		return style;
	}

	has_error: boolean = false;

	apply_zoom: boolean = false;

	displacement = {
		horizontal: 0,
		vertical: 0,
	};

	clamp(num: number, min: number, max: number): number {
		return Math.min(Math.max(num, min), max);
	}

	toggle_zoom(e: MouseEvent): void {
		if (!this.zoom) return;
		if (e.button === 0) this.apply_zoom = !this.apply_zoom;
	}

	mousemove(e: MouseEvent): void {
		this.displacement.horizontal = e.offsetX / this.$refs.container.clientWidth;
		this.displacement.vertical = e.offsetY / this.$refs.container.clientHeight;
	}
}
</script>

<style scoped>

.vx-image-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
}

.vx-image-has-zoom {
	cursor: zoom-in;
}

.vx-image-default {
	position: absolute;
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.vx-image-zoom-container {
	width: 100%;
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100% contain;
}

</style>
