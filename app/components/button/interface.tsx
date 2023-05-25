export interface ButtonProps {
  type: "submit" | "button";
  value: string;
  sx?: string, // addition tailwind class
  valueStyle? : string
  children?: React.ReactNode;
}
