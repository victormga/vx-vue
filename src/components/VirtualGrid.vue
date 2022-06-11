<template>
	<div ref="root" class="virtual-grid">
		<vx-virtual-list
		:theme="theme"
		:list="chunks"
		:loading="loading"
		:loading-label="loadingLabel"
		:empty-label="emptyLabel"
		:data-key="`id`"
		:height="height"
		:buffer-size="bufferSize">
			<template v-slot="{ item }">
				<vx-row :style="_row_style">

					<vx-column
					v-for="elm in item.list"
					:key="elm[dataKey]">
						<div class="vx-full">
							<slot :item="elm"></slot>
						</div>
					</vx-column>

					<vx-column
					v-for="i in number_of_placeholders(item.list.length)"
					:key="`_${i}`"
					class="vx-virtual-grid-col">
					</vx-column>

				</vx-row>
			</template>
		</vx-virtual-list>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "VirtualGrid",
	props: {
		theme: { type: String, required: false },
		list: { type: Array, required: true },
		loading: { type: Boolean, required: false, default: false },
		loadingLabel: { type: String, required: false, default: "LOADING..." },
		emptyLabel: { type: String, required: false, default: "No items" },
		dataKey: { type: String, required: false, default: "id" },
		bufferSize: { type: String, required: false, default: "20" },
		width: { type: String, required: false, default: "300" },
		height: { type: String, required: false, default: "200" },
		gap: { type: String, required: false },
	},
	watch: {
		list: function() {
			this.re_render();
		},
		dataKey: function() {
			this.re_render();
		},
		width: function() {
			this.re_render();
		},
	},
})
export default class VirtualGrid extends VxVue {
	declare list: any[];

	declare loading: boolean;

	declare loadingLabel: string;

	declare emptyLabel: string;

	declare dataKey: string;

	declare bufferSize: string;

	declare width: string;

	declare height: string;

	declare gap: string;

	declare $refs: {
		root: HTMLDivElement,
	};

	get _width(): number {
		return parseInt(this.width, 10);
	}

	get _row_style(): Record<string, unknown> {
		const style: Record<string, unknown> = {};
		if (this.gap) style["column-gap"] = this.$vx.cssValueFromString(this.gap);
		style.height = this.$vx.cssValueFromString(this.height);
		return style;
	}

	chunk_size: number = 0;

	chunks: any[] = [];

	on_resize: any;

	active: boolean = true;

	should_rerender: boolean = false;

	mounted(): void {
		this.re_render();

		this.on_resize = () => { this.re_render(); };
		window.addEventListener("resize", this.on_resize);
	}

	beforeUnmount(): void {
		window.removeEventListener("resize", this.on_resize);
	}

	deactivated(): void {
		this.active = false;
	}

	activated(): void {
		this.active = true;

		if (this.should_rerender) {
			this.should_rerender = false;
			this.re_render();
		}
	}

	re_render(): void {
		if (!this.active) {
			this.should_rerender = true;
			return;
		}

		this.chunk_size = Math.round(this.$refs.root.clientWidth / this._width);
		if (this.chunk_size === 0) this.chunk_size = 1;

		const list = [...this.list];

		const chunks = [];

		while (list.length) {
			const chunk = list.splice(0, this.chunk_size);
			const chunkId = chunk.map((item) => item[this.dataKey]).join("");
			// @ts-ignore
			chunks.push({ id: this.hashId(chunkId), list: chunk });
		}

		this.chunks = chunks;
	}

	hashId(str: string): string {
		let hash = 0;

		for (let i = 0; i < str.length; i += 1) {
			const char = str.charCodeAt(i);
			// eslint-disable-next-line no-bitwise
			hash = (hash << 5) - hash + char;
			// eslint-disable-next-line no-bitwise
			hash &= hash; // Convert to 32bit integer
		}

		return new Uint32Array([hash])[0].toString(36);
	}

	number_of_placeholders(current: number): number {
		const amount = this.chunk_size - current;
		if (amount < 0) return 0;
		return amount;
	}
}
</script>

<style scoped>

.virtual-grid {
	width: 100%;
	height: 100%;
}

.vx-virtual-grid-row {
	display: flex;
}

.vx-virtual-grid-col {
	display: flex;
	flex: 1;
	width: 100%;
	flex-grow: 1;
	height: 100%;
}

</style>
