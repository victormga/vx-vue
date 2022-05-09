<template>
	<i v-if="_show" class="vx-icon" :class="[..._theme, ..._classes]"></i>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "Icon",
	props: {
		theme: { type: String, required: false },
		icon: { type: String, required: false },
	},
})
export default class Icon extends VxVue {
	declare icon: string;

	get _attrs(): string[] {
		const icons = (this.icon) ? this.icon.split(" ") : [];

		icons.push(
			...Object.keys(this.$attrs).filter((key) => {
				if (["is", "id", "title", "class", "style"].includes(key)) return false;
				if (key.startsWith("v-")) return false;
				return true;
			}),
		);

		return icons;
	}

	get _show(): boolean {
		return this._attrs.length > 0;
	}

	get _classes(): string[] {
		const list = this._attrs.map((key) => `fa-${key}`);

		if (list.includes("fa-far")) {
			list.splice(list.indexOf("fa-far"));
			list.unshift("far");
		} else if (list.includes("fa-fab")) {
			list.splice(list.indexOf("fa-fab"));
			list.unshift("fab");
		} else {
			list.unshift("fa");
		}

		return list;
	}
}

</script>

<style scoped>

</style>
