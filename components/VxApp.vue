<template>
	<div
	id="vx-app vx-fixed"
	:class="_theme"
	class="vx-app">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "VxApp",
	props: {
		theme: { type: String, required: false, default: "primary md" },
	},
})
export default class VxApp extends VxVue {

}
</script>

<style scoped>
.vx-app {
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: var(--vx-theme-background1);
}
</style>
