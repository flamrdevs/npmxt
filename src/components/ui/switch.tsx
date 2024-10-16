import { splitProps } from "solid-js";

import * as K from "@kobalte/core/switch";

import { classesSplitter, classesx } from "~/utils";
import { inlineFormControlSplitter, ShowInlineFormControlLayout, type InlineFormControlProps } from "./utils";

export namespace Switch {
  export type Props = Pick<K.SwitchRootProps<"div">, "checked" | "onChange" | "readOnly" | "disabled"> &
    InlineFormControlProps &
    CLSX.ClassesValueProps &
    Pick<ShowInlineFormControlLayout.Props, "labelPosition">;
}

export const Switch = (props: Switch.Props) => {
  let [inlineFormControl, classes, others] = splitProps(props as Switch.Props, inlineFormControlSplitter, classesSplitter);

  const scope = "xt-switch";

  return (
    <K.Root class={classesx(classes, [ShowInlineFormControlLayout.scope, scope])} {...others}>
      <ShowInlineFormControlLayout {...inlineFormControl} Label={K.Label} defaultLabelPosition="left">
        <K.Input class={`${scope}-input`} />
        <K.Control class={`${scope}-control`}>
          <K.Thumb class={`${scope}-thumb`} />
        </K.Control>
      </ShowInlineFormControlLayout>
    </K.Root>
  );
};
