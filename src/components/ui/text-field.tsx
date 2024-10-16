import { splitProps } from "solid-js";

import * as K from "@kobalte/core/text-field";

import { classesSplitter, classesx } from "~/utils";
import { formControlSplitter, formControlValidationState, ShowFormControlLayout, type FormControlProps } from "./utils";

export namespace TextField {
  export type Props = Pick<K.TextFieldRootProps<"div">, "value" | "onChange" | "readOnly" | "disabled"> &
    FormControlProps &
    CLSX.ClassesValueProps & {
      placeholder?: string;
    };
}

const localSplitter = ["placeholder"] as const satisfies (keyof TextField.Props)[];

export const TextField = (props: TextField.Props) => {
  let [local, formControl, classes, others] = splitProps(props as TextField.Props, localSplitter, formControlSplitter, classesSplitter);

  const scope = "xt-text-field";

  return (
    <K.Root
      class={classesx(classes, [ShowFormControlLayout.scope, scope])}
      {...others}
      validationState={formControlValidationState(formControl)}
    >
      <ShowFormControlLayout {...formControl} Label={K.Label} Description={K.Description} ErrorMessage={K.ErrorMessage}>
        <K.Input class={`${scope}-input`} placeholder={local.placeholder} />
      </ShowFormControlLayout>
    </K.Root>
  );
};
