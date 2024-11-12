export const classesSplitter = ['class', 'classList'] as const satisfies (keyof Solid.JSX.HTMLAttributes<any>)[];
export const classesToArray = (props: CLSX.ClassesValueProps) => [props.class, props.classList];

export const klassXVariants = <
	const T extends {
		[variant: string]: string[];
	},
>(
	record: T
) => {
	const result = {} as {
		[K in keyof T]: {
			[L in T[K][number]]: string;
		};
	};

	let type: string;
	const entries = Object.entries(record);
	for (const [variant, types] of entries) {
		const value: Record<any, any> = {};
		for (type of types) value[type] = `x-${variant}-${type}`;
		result[variant as keyof typeof result] = value as any;
	}

	return result;
};
