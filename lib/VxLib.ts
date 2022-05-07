export type DialogOptions = {
	title?: string,
	content?: string,
	icon?: string,
	dismissable?: boolean,
	options?: { value: string, label: string, icon?: string, btnClass?: string[] }[],
	input?: {
		background?: boolean,
		material?: boolean,
		value?: any,
		type?: string,
		pattern?: string,
		options?: Record<string, unknown>,
		disabled?: boolean,
		label?: string,
		placeholder?: string,
		icon?: string,
		autofocus?: boolean,
		loading?: boolean,
	},
	okButton?: {
		content?: string,
		icon?: string,
	},
	cancelButton?: {
		content?: string,
		icon?: string,
	},
	validate?: (data: any) => boolean,
};

export type DialogElement = {
	type: string,
	options: DialogOptions,
	callback: (value: any) => void,
}

export type DialogWizzardMethods = {
	alert: (options: DialogOptions) => DialogWizzardMethods,
	confirm: (options: DialogOptions) => DialogWizzardMethods,
	choose: (options: DialogOptions) => DialogWizzardMethods,
	prompt: (options: DialogOptions) => DialogWizzardMethods,
	await: () => Promise<any[]>
}

export type ToastOptions = {
	theme?: string,
	title?: string,
	content?: string,
	icon?: string,
	image?: string,
	dismissable?: boolean,
	duration?: number,
}

export type ToastElement = {
	id: string,
	options: ToastOptions,
	callback: (value: boolean | PromiseLike<boolean>) => void,
}

export default class VxLib {
	dialog!: {
		alert: (options: DialogOptions) => Promise<boolean>,
		confirm: (options: DialogOptions) => Promise<boolean>,
		choose: (options: DialogOptions) => Promise<string>,
		prompt: (options: DialogOptions) => Promise<string>,
		wizzard: () => DialogWizzardMethods,
	}

	toast!: (options: ToastOptions) => Promise<boolean>;

	cssValueFromString(value: string): string {
		if (value === "0" || value === "") return "0";

		const isUnit = Number.isNaN(parseInt(value.slice(-1) as any, 10));
		if (isUnit) return value;

		return `${value}px`;
	}
}
