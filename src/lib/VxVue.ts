import { Vue } from "vue-class-component";

export default class VxVue extends Vue {
	declare theme?: string;

	get _theme(): string[] {
		const theme = this.theme ?? "";
		if (!theme) return [];
		return theme.split(" ").map((prop) => `vx-${prop}`);
	}
}
