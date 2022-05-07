export default class VxStyleProps {
	static background(withDefault?: boolean): Record<string, unknown> {
		if (withDefault) {
			return {
				background: { type: String, required: false, default: "none" },
			};
		}
		return {
			background: { type: String, required: false },
		};
	}

	static border(withDefault?: boolean): Record<string, unknown> {
		if (withDefault) {
			return {
				borderType: { type: String, required: false, default: "all" },
				borderColor: { type: String, required: false, default: "none" },
			};
		}
		return {
			borderType: { type: String, required: false, default: "all" },
			borderColor: { type: String, required: false },
		};
	}

	static elevated(): Record<string, unknown> {
		return {
			elevated: { type: Boolean, required: false },
		};
	}

	static round(): Record<string, unknown> {
		return {
			round: { type: String, required: false },
		};
	}

	static padding(): Record<string, unknown> {
		return {
			padding: { type: String, required: false },
			paddingDirection: { type: String, required: false, default: "all" },
		};
	}

	static text(): Record<string, unknown> {
		return {
			color: { type: String, required: false },
			size: { type: String, required: false },
			bold: { type: Boolean, required: false },
			ellipsis: { type: Boolean, required: false },
		};
	}

	static alignment(): Record<string, unknown> {
		return {
			left: { type: Boolean, required: false },
			center: { type: Boolean, required: false },
			right: { type: Boolean, required: false },
		};
	}

	static classesFromProps(props: string[], subject: any): string[] {
		const list: string[] = [];

		props.forEach((prop) => {
			switch (prop) {
			case "background": {
				if (subject.background) list.push(`vx-background-${subject.background}`);
				break;
			}
			case "border": {
				if (subject.borderColor) list.push(`vx-border-${subject.borderType}-${subject.borderColor}`);
				break;
			}
			case "elevated": {
				if (subject.elevated) list.push("vx-elevated");
				break;
			}
			case "round": {
				if (subject.round) list.push(`vx-round-${subject.round}`);
				break;
			}
			case "padding": {
				if (subject.padding) list.push(`vx-padding-${subject.paddingDirection}-${subject.padding}`);
				break;
			}
			case "text": {
				if (subject.color) list.push(`vx-color-${subject.color}`);
				if (subject.size) list.push(`vx-text-${subject.size}`);
				if (subject.bold) list.push("vx-text-bold");
				if (subject.ellipsis) list.push("vx-text-ellipsis");
				break;
			}
			case "alignment": {
				if (subject.left) list.push("vx-text-left");
				if (subject.center) list.push("vx-text-center");
				if (subject.right) list.push("vx-text-right");
				break;
			}
			default: { /**/ }
			}
		});

		return list;
	}
}
