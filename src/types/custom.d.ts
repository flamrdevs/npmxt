import type { JSX } from 'solid-js';
import type { Accessor, Component, ParentComponent, ParentProps, ValidComponent } from 'solid-js';

import type { APIEvent, APIHandler } from '@solidjs/start/server';

import type { ClassValue } from 'clsx';

declare global {
	var __DEV__: boolean;
	var __PRE__: boolean;
	var __TEST__: boolean;
	var __MSW__: boolean;
	var __MSW_DELAY__: boolean;

	namespace TF {
		export type * from 'type-fest';
		import('type-fest');
	}

	namespace CLSX {
		export type { ClassValue };

		export type ClassesValueProps = { class?: ClassValue };
	}

	namespace Solid {
		export type { JSX };
		export type { Accessor, Component, ParentComponent, ParentProps, ValidComponent };

		export type ClassesProps = { class?: string };

		export type NeverChildrenProps<P> = TF.Merge<P, { children?: never }>;
	}

	namespace SolidJS {
		export namespace Start {
			export namespace Server {
				export type { APIEvent, APIHandler };
			}
		}
	}
}
