<template>
	<div class="vx-accordeon">
		<div class="vx-accordeon-header" @click="toggle">
			<slot name="button"></slot>
			<div class="vx-accordeon-angle vx-hoverable">
				<vx-icon v-if="!opened" angle-down />
				<vx-icon v-if="opened" angle-up />
			</div>
		</div>
		<div ref="body" class="vx-accordeon-body">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">

import { Options, Vue } from "vue-class-component";

@Options({
	name: "Accordeon",
	inheritAttrs: false,
	props: {
		theme: { type: String, required: false },
		open: { type: Boolean, required: false },
	},
})
export default class Accordeon extends Vue {
	declare $refs: {
		body: HTMLDivElement,
	};

	declare open?: boolean;

	opened: boolean = false;

	mounted(): void {
		if (this.open) this.opened = true;
		this.animate();
	}

	toggle(): void {
		this.opened = !this.opened;
		this.animate();
	}

	animate(): void {
		if (this.opened) {
			this.$refs.body.style.height = "auto";
			const height = this.$refs.body.scrollHeight;
			this.$refs.body.style.height = "0";

			requestAnimationFrame(() => {
				this.$refs.body.style.height = `${height}px`;
			});
		} else {
			this.$refs.body.style.height = "0";
		}
	}
}

</script>

<style scoped>

.vx-accordeon {
	width: 100%;
}

.vx-accordeon-header {
	position: relative;
	float: left;
	width: 100%;
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	background: var(--vx-theme-background0);
	color: var(--vx-theme-color2);
	text-align: left;
	font-weight: bold;
	font-size: var(--vx-size-text2);
	padding: 0 var(--vx-size-spacing);
	cursor: pointer;
}

.vx-accordeon-angle {
	position: absolute;
	width: var(--vx-size-baseline);
	height: var(--vx-size-baseline);
	line-height: var(--vx-size-baseline);
	top: 0;
	right: 0;
	text-align: center;
	color: var(--vx-theme-color1);
}

.vx-accordeon-body {
	float: left;
	width: 100%;
	height: 0;
	overflow: hidden;
	transition: all .1s ease-in-out;
}

</style>
