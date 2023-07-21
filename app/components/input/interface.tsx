import type { Decimal } from "@prisma/client/runtime";

export interface InputProps {
  name: string;
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
  defaultValue?: string | null | number | Decimal;
  pattern?: string;
  variant?: "grid" | "flex";
  align?: "start" | "end" | "center";
}

export type TextAlign =
  | "text-end"
  | "text-start"
  | "text-center"
  | "text-right"
  | "text-left"
  | "text-justify";
