<template>
	<div
	:class="_theme"
	class="vx-virtual-list"
	ref="root"
	@scroll.passive="handle_scroll">
		<div class="vx-virtual-list-scroll" :style="_scroll_style">
			<div
			v-if="loading"
			class="vx-virtual-list-empty"
			:style="_empty_style"
			v-html="loadingLabel"></div>

			<div
			v-else-if="pool.length === 0"
			class="vx-virtual-list-empty"
			:style="_empty_style"
			v-html="emptyLabel"></div>

			<div
			v-else
			class="vx-virtual-list-item"
			v-for="item in pool"
			:key="item[dataKey]"
			:style="_item_style">
				<slot :item="item" :index="item[dataKey]"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options } from "vue-class-component";
import VxVue from "../lib/VxVue";

@Options({
	name: "VirtualList",
	props: {
		theme: { type: String, required: false },
		list: { type: Array, required: true },
		loading: { type: Boolean, required: false, default: false },
		loadingLabel: { type: String, required: false, default: "LOADING..." },
		emptyLabel: { type: String, required: false, default: "No items" },
		dataKey: { type: String, required: false, default: "id" },
		height: { type: String, required: false, default: "50" },
		bufferSize: { type: String, required: false, default: "50" },
	},
	watch: {
		list: function() {
			this.handle_scroll();
		},
		height: function() {
			this.handleScroll();
		},
	},
})
export default class VirtualList extends VxVue {
	declare list: any[];

	declare loading: boolean;

	declare loadingLabel: string;

	declare emptyLabel: string;

	declare dataKey: string;

	declare height: string;

	declare bufferSize: string;

	declare $refs: {
		root: HTMLDivElement,
	};

	get _scroll_style(): Record<string, unknown> {
		return {
			height: `${this._scroll_height}px`,
			"padding-top": `${this.padding_top}px`,
		};
	}

	get _empty_style(): Record<string, unknown> {
		return {
			height: `${this.height}px`,
			"line-height": `${this.height}px`,
		};
	}

	get _item_style(): Record<string, unknown> {
		return {
			height: `${this.height}px`,
		};
	}

	get _scroll_height(): number {
		return this.list.length * parseInt(this.height, 10);
	}

	get _item_height(): number {
		return parseInt(this.height, 10);
	}

	get _buffer_size(): number {
		return parseInt(this.bufferSize, 10);
	}

	pool: any[] = [];

	container_size: number = 0;

	padding_top: number = 0;

	is_scroll_busy: boolean = false;

	activated(): void {
		this.handle_scroll();
	}

	mounted(): void {
		if (!this.$refs.root) return;
		this.container_size = this.$refs.root.clientHeight;

		const contentLines = Math.ceil(this.container_size / this._item_height);
		const totalLines = contentLines + this._buffer_size;
		const range = [0, totalLines];
		this.pool = this.list.slice(range[0], range[0] + range[1]);
		// .map((v, i) => ({ ...v, _index: range[0] + i }));
	}

	handle_scroll(): void {
		if (!this.$refs.root) return;
		if (this.is_scroll_busy) return;
		this.is_scroll_busy = true;

		requestAnimationFrame(() => {
			this.is_scroll_busy = false;
			if (!this.$refs.root) return;

			const range: number[] = [];
			range[0] = Math.floor(this.$refs.root.scrollTop / this._item_height) - Math.floor(this._buffer_size / 2);
			range[0] = Math.max(range[0], 0);
			range[1] = range[0] + Math.floor(this.$refs.root.clientHeight / this._item_height) + this._buffer_size;
			range[1] = Math.min(range[1], this.list.length);
			this.pool = this.list.slice(range[0], range[1]);
			// .map((v, i) => ({ ...v, _index: range[0] + i }));
			this.padding_top = range[0] * this._item_height;
		});
	}
}
</script>

<style scoped>
.vx-virtual-list {
	width: 100%;
	height: 100%;
	min-width: 100px;
	min-height: 100px;
	overflow: auto;
}

.vx-virtual-list-scroll {
	width: 100%;
	height: 100%;
}

.vx-virtual-list-item {
	position: relative;
}

.vx-virtual-list-empty {
	width: 100%;
	text-align: center;
	font-weight: bold;
}
</style>
