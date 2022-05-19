/* eslint-disable */
declare module "vue-class-component";

declare module "vue" {
	type DefineComponent<T, U, V> = any;
}

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}