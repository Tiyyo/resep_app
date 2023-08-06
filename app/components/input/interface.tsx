export interface InputProps {
  name: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined | number;
  label?: string;
  unit?: string;
  step?: number;
  type?: string;
  width?: string;
  style?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: any;
  pattern?: string;
  variant?: "grid" | "flex";
  align?: "start" | "end" | "center";
  sx?: string;
  unitStyle?: string;
  fixedUnit?: boolean;
}

export type TextAlign =
  | "text-end"
  | "text-start"
  | "text-center"
  | "text-right"
  | "text-left"
  | "text-justify";
