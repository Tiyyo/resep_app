import type { AddButtonProps } from "../button_add/interface";

export interface GenerateJSXProps {
  buttonProps: AddButtonProps;
  errors: Array<string>;
  ElementToGenerate: (props: any) => JSX.Element;
  elementProps?: any;
}
