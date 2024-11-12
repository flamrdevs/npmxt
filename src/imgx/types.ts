import type { Properties as CSSTypeProperties } from 'csstype';

export namespace CSS {
	export type Properties = CSSTypeProperties<string | number>;

	export namespace Properties {
		export type Root = TF.OverrideProperties<Properties, { width: number; height: number }>;
	}
}

export type Tag = keyof Pick<HTMLElementTagNameMap, 'div'> | keyof SVGElementTagNameMap | (string & {});

export type Props = { [key: string]: unknown };
export namespace Props {
	export type Default<P extends Props = Props> = P & {
		style?: CSS.Properties;
		children?: Children;
	};
	export type Root<P extends Props = Props> = P & {
		style: CSS.Properties.Root;
		children: Children;
	};
	export type WithDefault<P extends Props = {}> = P & {
		style?: CSS.Properties;
		children?: Children;
	};
	export type WithRoot<P extends Props = {}> = P & {
		style?: CSS.Properties.Root;
		children?: Children;
	};
	export type WithDefaultStyle<P extends Props = {}> = P & {
		style?: CSS.Properties;
	};
	export type WithRootStyle<P extends Props = {}> = P & {
		style?: CSS.Properties.Root;
	};
	export type WithChildren<P extends Props = {}> = P & { children?: Children };
}

export type Node<P extends Props = Props> = { type: Tag; props: P };
export namespace Node {
	export type Default = Node<Props.Default>;
	export type Root = Node<Props.Root>;
}

export type Children = Node | Iterable<Children> | string | number | boolean | null | undefined;

export type Component<P extends Props = {}> = (props: P) => Node;
export namespace Component {
	export type Default<P extends Props = {}> = Component<Props.WithDefault<P>>;
	export type Root<P extends Props = {}> = Component<Props.WithRoot<P>>;
}
